import jsPDF from 'jspdf';
import { SentimentData, StockPrediction } from '../types';
import { format } from 'date-fns';

export class ExportService {
  exportToPDF(
    symbol: string,
    sentimentData: SentimentData[],
    prediction: StockPrediction,
    overallScore: number
  ) {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Stock Sentiment Analysis Report', 20, 30);
    
    doc.setFontSize(16);
    doc.text(`Symbol: ${symbol}`, 20, 50);
    doc.text(`Generated: ${format(new Date(), 'PPpp')}`, 20, 65);
    
    // Overall Sentiment
    doc.setFontSize(14);
    doc.text('Overall Sentiment Analysis', 20, 85);
    doc.setFontSize(12);
    doc.text(`Sentiment Score: ${overallScore.toFixed(3)}`, 20, 100);
    doc.text(`Recommendation: ${prediction.recommendation.toUpperCase()}`, 20, 115);
    doc.text(`Confidence: ${prediction.confidence.toFixed(1)}%`, 20, 130);
    
    // Reasoning
    doc.text('Analysis Reasoning:', 20, 150);
    const splitReasoning = doc.splitTextToSize(prediction.reasoning, 160);
    doc.text(splitReasoning, 20, 165);
    
    // Data Summary
    doc.text('Data Summary:', 20, 190);
    const positive = sentimentData.filter(d => d.sentiment === 'positive').length;
    const negative = sentimentData.filter(d => d.sentiment === 'negative').length;
    const neutral = sentimentData.filter(d => d.sentiment === 'neutral').length;
    
    doc.text(`Total Data Points: ${sentimentData.length}`, 20, 205);
    doc.text(`Positive: ${positive} (${((positive/sentimentData.length)*100).toFixed(1)}%)`, 20, 220);
    doc.text(`Negative: ${negative} (${((negative/sentimentData.length)*100).toFixed(1)}%)`, 20, 235);
    doc.text(`Neutral: ${neutral} (${((neutral/sentimentData.length)*100).toFixed(1)}%)`, 20, 250);
    
    doc.save(`${symbol}-sentiment-analysis-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  }

  exportToCSV(symbol: string, sentimentData: SentimentData[]) {
    const headers = ['Date', 'Source', 'Sentiment', 'Score', 'Text'];
    const csvContent = [
      headers.join(','),
      ...sentimentData.map(data => [
        format(data.timestamp, 'yyyy-MM-dd HH:mm:ss'),
        data.source,
        data.sentiment,
        data.score.toFixed(3),
        `"${data.text.replace(/"/g, '""')}"` // Escape quotes
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${symbol}-sentiment-data-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const exportService = new ExportService();