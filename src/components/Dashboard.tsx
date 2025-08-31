import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SentimentData, SentimentTrend, StockPrediction, Stock } from '../types';
import { generateMockSentimentData, generateMockTrendData, mockStocks } from '../services/mockData';
import { sentimentAnalyzer } from '../services/sentimentAnalysis';
import { predictionEngine } from '../services/predictionEngine';
import SentimentChart from './SentimentChart';
import SentimentCard from './SentimentCard';
import StockOverview from './StockOverview';
import FilterControls from './FilterControls';
import StatsGrid from './StatsGrid';
import ExportPanel from './ExportPanel';
import LoadingSpinner from './LoadingSpinner';

interface DashboardProps {
  watchedSymbols: string[];
  onRemoveStock: (symbol: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ watchedSymbols, onRemoveStock }) => {
  const [selectedStock, setSelectedStock] = useState<string>(watchedSymbols[0] || 'AAPL');
  const [sentimentData, setSentimentData] = useState<SentimentData[]>([]);
  const [trendData, setTrendData] = useState<SentimentTrend[]>([]);
  const [prediction, setPrediction] = useState<StockPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSentiment, setSelectedSentiment] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [selectedSource, setSelectedSource] = useState<'all' | 'news' | 'twitter' | 'reddit'>('all');
  const [dateRange, setDateRange] = useState('7d');

  const loadStockData = async (symbol: string) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockSentiment = generateMockSentimentData(symbol);
    const mockTrend = generateMockTrendData(symbol);
    const stockPrediction = predictionEngine.generatePrediction(symbol, mockSentiment);
    
    setSentimentData(mockSentiment);
    setTrendData(mockTrend);
    setPrediction(stockPrediction);
    setLoading(false);
  };

  useEffect(() => {
    if (selectedStock) {
      loadStockData(selectedStock);
    }
  }, [selectedStock]);

  useEffect(() => {
    if (watchedSymbols.length > 0 && !watchedSymbols.includes(selectedStock)) {
      setSelectedStock(watchedSymbols[0]);
    }
  }, [watchedSymbols, selectedStock]);

  const getStockInfo = (symbol: string): Stock => {
    return mockStocks.find(s => s.symbol === symbol) || {
      symbol,
      name: `${symbol} Corp.`,
      price: 150 + Math.random() * 300,
      change: (Math.random() - 0.5) * 20,
      changePercent: (Math.random() - 0.5) * 5,
    };
  };

  const filteredSentimentData = sentimentData.filter(data => {
    const sentimentMatch = selectedSentiment === 'all' || data.sentiment === selectedSentiment;
    const sourceMatch = selectedSource === 'all' || data.source === selectedSource;
    
    let dateMatch = true;
    const now = new Date();
    const dataDate = new Date(data.timestamp);
    const daysDiff = (now.getTime() - dataDate.getTime()) / (1000 * 60 * 60 * 24);
    
    switch (dateRange) {
      case '1d':
        dateMatch = daysDiff <= 1;
        break;
      case '3d':
        dateMatch = daysDiff <= 3;
        break;
      case '7d':
        dateMatch = daysDiff <= 7;
        break;
      case '30d':
        dateMatch = daysDiff <= 30;
        break;
    }
    
    return sentimentMatch && sourceMatch && dateMatch;
  });

  const overallScore = sentimentAnalyzer.analyzeOverallSentiment(filteredSentimentData);
  const distribution = sentimentAnalyzer.getSentimentDistribution(filteredSentimentData);

  if (watchedSymbols.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            No stocks selected
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Add a stock symbol above to start analyzing sentiment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stock Tabs */}
      <div className="flex flex-wrap gap-2">
        {watchedSymbols.map(symbol => (
          <button
            key={symbol}
            onClick={() => setSelectedStock(symbol)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedStock === symbol
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
            }`}
          >
            <span>{symbol}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveStock(symbol);
              }}
              className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner message={`Analyzing sentiment for ${selectedStock}...`} />
      ) : (
        <>
          {/* Stats Grid */}
          <StatsGrid
            totalPosts={filteredSentimentData.length}
            positivePercentage={distribution.positive}
            negativePercentage={distribution.negative}
            avgSentimentScore={overallScore}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stock Overview */}
              {prediction && (
                <StockOverview
                  stock={getStockInfo(selectedStock)}
                  prediction={prediction}
                  sentimentScore={overallScore}
                />
              )}

              {/* Filter Controls */}
              <FilterControls
                selectedSentiment={selectedSentiment}
                onSentimentChange={setSelectedSentiment}
                selectedSource={selectedSource}
                onSourceChange={setSelectedSource}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />

              {/* Sentiment Chart */}
              <SentimentChart data={trendData} symbol={selectedStock} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Export Panel */}
              {prediction && (
                <ExportPanel
                  symbol={selectedStock}
                  sentimentData={filteredSentimentData}
                  prediction={prediction}
                  overallScore={overallScore}
                />
              )}

              {/* Recent Sentiment Posts */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Sentiment ({filteredSentimentData.length})
                </h3>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredSentimentData
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .slice(0, 10)
                    .map(data => (
                      <SentimentCard key={data.id} data={data} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;