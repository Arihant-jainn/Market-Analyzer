import React from 'react';
import { Filter, Calendar, TrendingUp } from 'lucide-react';

interface FilterControlsProps {
  selectedSentiment: 'all' | 'positive' | 'negative' | 'neutral';
  onSentimentChange: (sentiment: 'all' | 'positive' | 'negative' | 'neutral') => void;
  selectedSource: 'all' | 'news' | 'twitter' | 'reddit';
  onSourceChange: (source: 'all' | 'news' | 'twitter' | 'reddit') => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  selectedSentiment,
  onSentimentChange,
  selectedSource,
  onSourceChange,
  dateRange,
  onDateRangeChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Filter className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filter Analysis
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sentiment Filter */}
        <div>
          <label className="flex items-center space-x-2 mb-3">
            <TrendingUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sentiment Type
            </span>
          </label>
          <select
            value={selectedSentiment}
            onChange={(e) => onSentimentChange(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Sentiments</option>
            <option value="positive">Positive Only</option>
            <option value="negative">Negative Only</option>
            <option value="neutral">Neutral Only</option>
          </select>
        </div>
        
        {/* Source Filter */}
        <div>
          <label className="flex items-center space-x-2 mb-3">
            <Filter className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Data Source
            </span>
          </label>
          <select
            value={selectedSource}
            onChange={(e) => onSourceChange(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Sources</option>
            <option value="news">News Only</option>
            <option value="twitter">Twitter Only</option>
            <option value="reddit">Reddit Only</option>
          </select>
        </div>
        
        {/* Date Range Filter */}
        <div>
          <label className="flex items-center space-x-2 mb-3">
            <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Time Period
            </span>
          </label>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="3d">Last 3 Days</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;