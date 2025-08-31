import { SentimentData, StockPrediction } from '../types';
import { sentimentAnalyzer } from './sentimentAnalysis';

export class PredictionEngine {
  generatePrediction(symbol: string, sentimentData: SentimentData[]): StockPrediction {
    const overallScore = sentimentAnalyzer.analyzeOverallSentiment(sentimentData);
    const distribution = sentimentAnalyzer.getSentimentDistribution(sentimentData);
    
    // Recent trend analysis (last 7 days vs previous 7 days)
    const recentData = sentimentData.filter(d => 
      new Date(d.timestamp).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
    );
    const olderData = sentimentData.filter(d => 
      new Date(d.timestamp).getTime() <= Date.now() - 7 * 24 * 60 * 60 * 1000 &&
      new Date(d.timestamp).getTime() > Date.now() - 14 * 24 * 60 * 60 * 1000
    );
    
    const recentScore = sentimentAnalyzer.analyzeOverallSentiment(recentData);
    const olderScore = sentimentAnalyzer.analyzeOverallSentiment(olderData);
    const trendDirection = recentScore - olderScore;
    
    // Confidence based on data volume and consistency
    const dataVolume = sentimentData.length;
    const sentimentConsistency = Math.max(distribution.positive, distribution.negative, distribution.neutral);
    const confidence = Math.min(95, (dataVolume / 100) * 100 + sentimentConsistency * 0.5);
    
    // Generate recommendation
    let recommendation: 'buy' | 'hold' | 'watch' | 'sell';
    let reasoning: string;
    
    if (overallScore > 0.3 && trendDirection > 0.1) {
      recommendation = 'buy';
      reasoning = `Strong positive sentiment (${(overallScore * 100).toFixed(1)}%) with improving trend. High confidence in short-term growth.`;
    } else if (overallScore > 0.1 && trendDirection >= 0) {
      recommendation = 'hold';
      reasoning = `Moderately positive sentiment with stable trend. Good for maintaining current positions.`;
    } else if (overallScore < -0.3 && trendDirection < -0.1) {
      recommendation = 'sell';
      reasoning = `Strongly negative sentiment (${(Math.abs(overallScore) * 100).toFixed(1)}%) with declining trend. Consider reducing exposure.`;
    } else if (overallScore < -0.1) {
      recommendation = 'watch';
      reasoning = `Negative sentiment detected. Monitor closely for potential entry points or further decline.`;
    } else {
      recommendation = 'watch';
      reasoning = `Mixed or neutral sentiment. Wait for clearer signals before making investment decisions.`;
    }
    
    return {
      symbol,
      recommendation,
      confidence,
      reasoning,
      sentimentScore: overallScore,
    };
  }
}

export const predictionEngine = new PredictionEngine();