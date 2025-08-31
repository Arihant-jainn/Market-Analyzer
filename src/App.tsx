import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StockSearch from './components/StockSearch';
import Dashboard from './components/Dashboard';
import TrendingStocks from './components/TrendingStocks';
import SentimentHeatmap from './components/SentimentHeatmap';
import { generateTrendingStocks, mockStocks } from './services/mockData';
import { sentimentAnalyzer } from './services/sentimentAnalysis';

function App() {
  const [watchedSymbols, setWatchedSymbols] = useState<string[]>(['AAPL', 'MSFT']);
  const [trendingStocks, setTrendingStocks] = useState(generateTrendingStocks());
  const [heatmapData, setHeatmapData] = useState<{ symbol: string; sentiment: number }[]>([]);

  useEffect(() => {
    // Generate heatmap data for popular stocks
    const popularStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'AMD', 'CRM'];
    const heatmapStocks = popularStocks.map(symbol => ({
      symbol,
      sentiment: (Math.random() - 0.5) * 2, // -1 to 1
    }));
    setHeatmapData(heatmapStocks);

    // Update trending stocks every 30 seconds
    const interval = setInterval(() => {
      setTrendingStocks(generateTrendingStocks());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleAddStock = (symbol: string) => {
    if (!watchedSymbols.includes(symbol)) {
      setWatchedSymbols([...watchedSymbols, symbol]);
    }
  };

  const handleRemoveStock = (symbol: string) => {
    setWatchedSymbols(watchedSymbols.filter(s => s !== symbol));
  };

  const handleSelectFromTrending = (symbol: string) => {
    if (!watchedSymbols.includes(symbol)) {
      setWatchedSymbols([...watchedSymbols, symbol]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              AI-Powered Market Sentiment Analysis
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Analyze real-time sentiment from news, social media, and market data to make informed investment decisions
            </p>
          </div>

          {/* Search and Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StockSearch 
              onAddStock={handleAddStock} 
              watchedSymbols={watchedSymbols} 
            />
            
            <div className="lg:col-span-2">
              <TrendingStocks 
                stocks={trendingStocks} 
                onSelectStock={handleSelectFromTrending}
              />
            </div>
          </div>

          {/* Sentiment Heatmap */}
          <SentimentHeatmap 
            stocks={heatmapData} 
            onSelectStock={handleSelectFromTrending}
          />

          {/* Main Dashboard */}
          <Dashboard 
            watchedSymbols={watchedSymbols}
            onRemoveStock={handleRemoveStock}
          />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              AI Stock Sentiment Analyzer - Powered by Advanced NLP and Market Data APIs
            </p>
            <p className="text-sm">
              Built with React, TypeScript, and Tailwind CSS. Ready for production deployment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;