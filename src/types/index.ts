export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface SentimentData {
  id: string;
  source: 'news' | 'twitter' | 'reddit';
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  timestamp: Date;
  stock: string;
  url?: string;
  author?: string;
}

export interface SentimentTrend {
  date: string;
  positive: number;
  negative: number;
  neutral: number;
  overall: number;
}

export interface StockPrediction {
  symbol: string;
  recommendation: 'buy' | 'hold' | 'watch' | 'sell';
  confidence: number;
  reasoning: string;
  sentimentScore: number;
}

export interface TrendingStock {
  symbol: string;
  name: string;
  sentimentChange: number;
  volume: number;
  mentions: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: Date;
  source: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  relevantStocks: string[];
}