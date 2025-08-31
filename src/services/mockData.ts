import { SentimentData, Stock, SentimentTrend, StockPrediction, TrendingStock, NewsArticle } from '../types';

// Mock data generators for demonstration
export const generateMockSentimentData = (symbol: string): SentimentData[] => {
  const sources: ('news' | 'twitter' | 'reddit')[] = ['news', 'twitter', 'reddit'];
  const sentiments: ('positive' | 'negative' | 'neutral')[] = ['positive', 'negative', 'neutral'];
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `sentiment-${symbol}-${i}`,
    source: sources[Math.floor(Math.random() * sources.length)],
    text: generateMockText(symbol),
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    score: Math.random() * 2 - 1, // -1 to 1
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    stock: symbol,
    url: `https://example.com/post/${i}`,
    author: `user${i}`,
  }));
};

export const generateMockText = (symbol: string): string => {
  const texts = [
    `${symbol} is showing strong fundamentals and great potential for growth`,
    `Concerned about ${symbol}'s recent performance and market conditions`,
    `${symbol} earnings report looks promising, good quarter ahead`,
    `Market volatility affecting ${symbol} but long-term outlook remains stable`,
    `Breaking: ${symbol} announces new partnership deal`,
    `${symbol} stock price target raised by analysts`,
    `Investors cautious about ${symbol} amid economic uncertainty`,
    `${symbol} innovation pipeline looks very promising for next year`,
  ];
  return texts[Math.floor(Math.random() * texts.length)];
};

export const generateMockTrendData = (symbol: string): SentimentTrend[] => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    const positive = Math.random() * 40 + 10;
    const negative = Math.random() * 30 + 5;
    const neutral = 100 - positive - negative;
    const overall = (positive - negative) / 100;
    
    return {
      date: date.toISOString().split('T')[0],
      positive,
      negative,
      neutral,
      overall,
    };
  });
};

export const mockStocks: Stock[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.25, change: 2.45, changePercent: 1.39 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.32, change: -3.12, changePercent: -0.74 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 140.85, change: 1.87, changePercent: 1.35 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 155.43, change: 4.23, changePercent: 2.80 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.67, change: -8.45, changePercent: -3.29 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.23, change: 15.67, changePercent: 1.82 },
];

export const generateMockPredictions = (symbols: string[]): StockPrediction[] => {
  const recommendations: ('buy' | 'hold' | 'watch' | 'sell')[] = ['buy', 'hold', 'watch', 'sell'];
  const reasons = [
    'Strong positive sentiment trend with increasing social media mentions',
    'Mixed sentiment signals require careful monitoring',
    'Declining sentiment may indicate short-term volatility',
    'Overwhelmingly positive news coverage and analyst reports',
    'Neutral sentiment suggests stable but limited growth potential',
  ];

  return symbols.map(symbol => ({
    symbol,
    recommendation: recommendations[Math.floor(Math.random() * recommendations.length)],
    confidence: Math.random() * 40 + 60, // 60-100%
    reasoning: reasons[Math.floor(Math.random() * reasons.length)],
    sentimentScore: Math.random() * 2 - 1, // -1 to 1
  }));
};

export const generateTrendingStocks = (): TrendingStock[] => {
  return [
    { symbol: 'NVDA', name: 'NVIDIA Corp.', sentimentChange: 15.3, volume: 45234567, mentions: 12450 },
    { symbol: 'TSLA', name: 'Tesla Inc.', sentimentChange: -8.7, volume: 38567234, mentions: 9876 },
    { symbol: 'AAPL', name: 'Apple Inc.', sentimentChange: 5.2, volume: 52345678, mentions: 8765 },
    { symbol: 'AMD', name: 'Advanced Micro Devices', sentimentChange: 12.1, volume: 23456789, mentions: 6543 },
    { symbol: 'META', name: 'Meta Platforms', sentimentChange: -3.4, volume: 19876543, mentions: 5432 },
  ];
};

export const generateMockNews = (symbol: string): NewsArticle[] => {
  const headlines = [
    `${symbol} Reports Strong Q4 Earnings, Beats Expectations`,
    `Analysts Raise Price Target for ${symbol} Following Innovation Announcement`,
    `Market Volatility Impacts ${symbol} Trading Volume`,
    `${symbol} Announces Strategic Partnership Deal`,
    `Institutional Investors Increase ${symbol} Holdings`,
  ];

  return headlines.map((title, i) => ({
    id: `news-${symbol}-${i}`,
    title,
    summary: `${title}. Market experts analyze the implications for ${symbol} and the broader technology sector.`,
    url: `https://financialnews.example.com/article/${i}`,
    publishedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
    source: ['Reuters', 'Bloomberg', 'Wall Street Journal', 'Financial Times'][i % 4],
    sentiment: ['positive', 'negative', 'neutral'][Math.floor(Math.random() * 3)] as 'positive' | 'negative' | 'neutral',
    score: Math.random() * 2 - 1,
    relevantStocks: [symbol],
  }));
};