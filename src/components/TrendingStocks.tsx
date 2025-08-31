import React from 'react';
import { TrendingUp, TrendingDown, MessageCircle, BarChart3 } from 'lucide-react';
import { TrendingStock } from '../types';

interface TrendingStocksProps {
  stocks: TrendingStock[];
  onSelectStock: (symbol: string) => void;
}

const TrendingStocks: React.FC<TrendingStocksProps> = ({ stocks, onSelectStock }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <BarChart3 className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Trending Stocks
        </h2>
        <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="space-y-4">
        {stocks.map((stock, index) => (
          <div
            key={stock.symbol}
            onClick={() => onSelectStock(stock.symbol)}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full font-bold text-sm">
                {index + 1}
              </div>
              
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {stock.symbol}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {stock.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {stock.mentions.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {stock.sentimentChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-success-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-danger-500" />
                )}
                <span className={`text-sm font-medium ${
                  stock.sentimentChange >= 0 
                    ? 'text-success-600 dark:text-success-400' 
                    : 'text-danger-600 dark:text-danger-400'
                }`}>
                  {stock.sentimentChange >= 0 ? '+' : ''}{stock.sentimentChange.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingStocks;