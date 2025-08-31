import React from 'react';
import { TrendingUp, TrendingDown, Minus, MessageCircle, ExternalLink } from 'lucide-react';
import { SentimentData } from '../types';
import { format } from 'date-fns';

interface SentimentCardProps {
  data: SentimentData;
}

const SentimentCard: React.FC<SentimentCardProps> = ({ data }) => {
  const getSentimentIcon = () => {
    switch (data.sentiment) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-success-500" />;
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-danger-500" />;
      default:
        return <Minus className="h-5 w-5 text-warning-500" />;
    }
  };

  const getSentimentColor = () => {
    switch (data.sentiment) {
      case 'positive':
        return 'border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-900/20';
      case 'negative':
        return 'border-danger-200 dark:border-danger-800 bg-danger-50 dark:bg-danger-900/20';
      default:
        return 'border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-900/20';
    }
  };

  const getSourceIcon = () => {
    switch (data.source) {
      case 'twitter':
        return '🐦';
      case 'reddit':
        return '🤖';
      case 'news':
        return '📰';
      default:
        return '📄';
    }
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${getSentimentColor()} hover:shadow-md transition-all duration-200 animate-slide-up`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getSourceIcon()}</span>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
            {data.source}
          </span>
          {data.author && (
            <span className="text-sm text-gray-500 dark:text-gray-500">
              by @{data.author}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {getSentimentIcon()}
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {(data.score * 100).toFixed(0)}%
          </span>
        </div>
      </div>
      
      <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed mb-3">
        {data.text}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <MessageCircle className="h-4 w-4" />
          <span>{format(data.timestamp, 'MMM d, h:mm a')}</span>
        </div>
        
        {data.url && (
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
          >
            <ExternalLink className="h-3 w-3" />
            <span>Source</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default SentimentCard;