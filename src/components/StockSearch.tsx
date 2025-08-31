import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

interface StockSearchProps {
  onAddStock: (symbol: string) => void;
  watchedSymbols: string[];
}

const StockSearch: React.FC<StockSearchProps> = ({ onAddStock, watchedSymbols }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions] = useState([
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'AMD', 'CRM'
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && !watchedSymbols.includes(searchTerm.toUpperCase())) {
      onAddStock(searchTerm.toUpperCase());
      setSearchTerm('');
    }
  };

  const filteredSuggestions = suggestions.filter(symbol => 
    symbol.includes(searchTerm.toUpperCase()) && !watchedSymbols.includes(symbol)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Add Stock to Watch
      </h2>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter stock symbol (e.g., AAPL)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          <button
            type="submit"
            disabled={!searchTerm.trim() || watchedSymbols.includes(searchTerm.toUpperCase())}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 disabled:cursor-not-allowed"
          >
            <Plus className="h-5 w-5" />
            <span>Add</span>
          </button>
        </div>
      </form>
      
      {searchTerm && filteredSuggestions.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {filteredSuggestions.slice(0, 5).map(symbol => (
              <button
                key={symbol}
                onClick={() => {
                  onAddStock(symbol);
                  setSearchTerm('');
                }}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm transition-colors duration-200"
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSearch;