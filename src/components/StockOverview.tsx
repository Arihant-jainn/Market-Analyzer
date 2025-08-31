import React from 'react';
import { TrendingUp, TrendingDown, Activity, Target } from 'lucide-react';
import { Stock, StockPrediction } from '../types';

interface StockOverviewProps {
  stock: Stock;
  prediction: StockPrediction;
  sentimentScore: number;
}

const StockOverview: React.FC<StockOverviewProps> = ({ stock, prediction, sentimentScore }) => {
  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'buy':
        return 'bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-300 border-success-200 dark:border-success-700';
      case 'sell':
        return 'bg-danger-100 dark:bg-danger-900/30 text-danger-800 dark:text-danger-300 border-danger-200 dark:border-danger-700';
      case 'watch':
        return 'bg-warning-100 dark:bg-warning-900/30 text-warning-800 dark:text-warning-300 border-warning-200 dark:border-warning-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600';
    }
  };

  const getSentimentColor = (score: number) => {
    if (score > 0.1) return 'text-success-600 dark:text-success-400';
    if (score < -0.1) return 'text-danger-600 dark:text-danger-400';
    return 'text-warning-600 dark:text-warning-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {stock.symbol}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {stock.name}
          </p>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${stock.price.toFixed(2)}
          </p>
          <div className="flex items-center space-x-1">
            {stock.change >= 0 ? (
              <TrendingUp className="h-4 w-4 text-success-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-danger-500" />
            )}
            <span className={`text-sm font-medium ${stock.change >= 0 ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'}`}>
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <Activity className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Sentiment Score</p>
            <p className={`font-bold ${getSentimentColor(sentimentScore)}`}>
              {(sentimentScore * 100).toFixed(1)}%
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <Target className="h-5 w-5 text-primary-600 dark:text-primary-400" />
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Confidence</p>
            <p className="font-bold text-gray-900 dark:text-white">
              {prediction.confidence.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
      
      <div className={`p-4 rounded-lg border-2 ${getRecommendationColor(prediction.recommendation)}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">AI Recommendation</span>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            {prediction.recommendation}
          </span>
        </div>
        <p className="text-sm leading-relaxed">
          {prediction.reasoning}
        </p>
      </div>
    </div>
  );
};

export default StockOverview;