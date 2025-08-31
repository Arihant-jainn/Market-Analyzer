import { SentimentData } from '../types';

// Simple sentiment analysis using keyword-based approach
// In production, this would be replaced with actual NLP API calls
export class SentimentAnalyzer {
  private positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'fantastic', 'outstanding', 'bullish',
    'growth', 'profit', 'gains', 'success', 'strong', 'robust', 'solid',
    'buy', 'recommend', 'optimistic', 'positive', 'upward', 'rising', 'surge'
  ];

  private negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'disappointing', 'bearish',
    'loss', 'decline', 'drop', 'fall', 'crash', 'weak', 'poor',
    'sell', 'avoid', 'pessimistic', 'negative', 'downward', 'falling', 'plunge'
  ];

  analyzeSentiment(text: string): { sentiment: 'positive' | 'negative' | 'neutral'; score: number } {
    const words = text.toLowerCase().split(/\W+/);
    let positiveCount = 0;
    let negativeCount = 0;

    words.forEach(word => {
      if (this.positiveWords.includes(word)) positiveCount++;
      if (this.negativeWords.includes(word)) negativeCount++;
    });

    const totalSentimentWords = positiveCount + negativeCount;
    if (totalSentimentWords === 0) {
      return { sentiment: 'neutral', score: 0 };
    }

    const score = (positiveCount - negativeCount) / Math.max(totalSentimentWords, 1);
    
    if (score > 0.1) return { sentiment: 'positive', score };
    if (score < -0.1) return { sentiment: 'negative', score };
    return { sentiment: 'neutral', score };
  }

  analyzeOverallSentiment(sentimentData: SentimentData[]): number {
    if (sentimentData.length === 0) return 0;
    
    const totalScore = sentimentData.reduce((sum, data) => sum + data.score, 0);
    return totalScore / sentimentData.length;
  }

  getSentimentDistribution(sentimentData: SentimentData[]) {
    const total = sentimentData.length;
    if (total === 0) return { positive: 0, negative: 0, neutral: 100 };

    const positive = (sentimentData.filter(d => d.sentiment === 'positive').length / total) * 100;
    const negative = (sentimentData.filter(d => d.sentiment === 'negative').length / total) * 100;
    const neutral = 100 - positive - negative;

    return { positive, negative, neutral };
  }
}

export const sentimentAnalyzer = new SentimentAnalyzer();