import React from 'react';
import { Stock } from '../types';

interface SentimentHeatmapProps {
  stocks: { symbol: string; sentiment: number }[];
  onSelectStock: (symbol: string) => void;
}

const SentimentHeatmap: React.FC<SentimentHeatmapProps> = ({ stocks, onSelectStock }) => {
  const getHeatmapColor = (sentiment: number) => {
    if (sentiment > 0.3) return 'bg-success-500 text-white';
    if (sentiment > 0.1) return 'bg-success-300 text-success-900';
    if (sentiment > -0.1) return 'bg-warning-300 text-warning-900';
    if (sentiment > -0.3) return 'bg-danger-300 text-danger-900';
    return 'bg-danger-500 text-white';
  };

  const getIntensity = (sentiment: number) => {
    const intensity = Math.abs(sentiment);
    if (intensity > 0.7) return 'opacity-100';
    if (intensity > 0.5) return 'opacity-90';
    if (intensity > 0.3) return 'opacity-80';
    if (intensity > 0.1) return 'opacity-70';
    return 'opacity-60';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Sentiment Heatmap
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => onSelectStock(stock.symbol)}
            className={`
              p-4 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg
              ${getHeatmapColor(stock.sentiment)} ${getIntensity(stock.sentiment)}
            `}
          >
            <div className="text-center">
              <p className="font-bold text-sm mb-1">{stock.symbol}</p>
              <p className="text-xs opacity-90">
                {(stock.sentiment * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <span>Very Negative</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-danger-500 rounded"></div>
          <div className="w-4 h-4 bg-danger-300 rounded"></div>
          <div className="w-4 h-4 bg-warning-300 rounded"></div>
          <div className="w-4 h-4 bg-success-300 rounded"></div>
          <div className="w-4 h-4 bg-success-500 rounded"></div>
        </div>
        <span>Very Positive</span>
      </div>
    </div>
  );
};

export default SentimentHeatmap;