import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Analyzing sentiment...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative">
        <Loader2 className="h-12 w-12 text-primary-600 dark:text-primary-400 animate-spin" />
        <div className="absolute inset-0 rounded-full border-2 border-primary-200 dark:border-primary-800 animate-pulse"></div>
      </div>
      
      <div className="text-center">
        <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {message}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Processing real-time market data and social sentiment...
        </p>
      </div>
      
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;