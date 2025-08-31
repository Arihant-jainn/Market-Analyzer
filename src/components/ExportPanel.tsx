import React from 'react';
import { Download, FileText, Table } from 'lucide-react';
import { exportService } from '../services/exportService';
import { SentimentData, StockPrediction } from '../types';

interface ExportPanelProps {
  symbol: string;
  sentimentData: SentimentData[];
  prediction: StockPrediction;
  overallScore: number;
}

const ExportPanel: React.FC<ExportPanelProps> = ({ 
  symbol, 
  sentimentData, 
  prediction, 
  overallScore 
}) => {
  const handlePDFExport = () => {
    exportService.exportToPDF(symbol, sentimentData, prediction, overallScore);
  };

  const handleCSVExport = () => {
    exportService.exportToCSV(symbol, sentimentData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-4">
        <Download className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Export Analysis
        </h3>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={handlePDFExport}
          className="w-full flex items-center space-x-3 p-4 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg transition-colors duration-200 border border-primary-200 dark:border-primary-700"
        >
          <FileText className="h-5 w-5" />
          <div className="text-left">
            <p className="font-medium">Download PDF Report</p>
            <p className="text-xs opacity-80">Complete analysis with predictions</p>
          </div>
        </button>
        
        <button
          onClick={handleCSVExport}
          className="w-full flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 border border-gray-200 dark:border-gray-600"
        >
          <Table className="h-5 w-5" />
          <div className="text-left">
            <p className="font-medium">Download CSV Data</p>
            <p className="text-xs opacity-80">Raw sentiment data for analysis</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ExportPanel;