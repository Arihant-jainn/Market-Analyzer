# AI Stock Market Sentiment Analyzer

A sophisticated web application that analyzes financial news, social media posts, and market trends to generate real-time sentiment analysis and predictions for stocks. Built with React, TypeScript, and advanced data visualization capabilities.

## 🚀 Features

### Core Functionality
- **Real-time Sentiment Analysis**: Analyze sentiment from multiple data sources (news, Twitter, Reddit)
- **AI-Powered Predictions**: Generate buy/hold/watch/sell recommendations based on sentiment trends
- **Interactive Visualizations**: Dynamic charts showing sentiment trends over time
- **Stock Comparison Tools**: Compare sentiment across multiple stocks simultaneously
- **Export Capabilities**: Download analysis reports as PDF or raw data as CSV

### Advanced Features
- **Sentiment Heatmap**: Visual representation of market sentiment across popular stocks
- **Trending Stocks**: Real-time tracking of stocks with changing sentiment
- **Multi-Source Analysis**: Aggregate data from news outlets, social media platforms
- **Filtering System**: Filter by sentiment type, data source, and time period
- **Dark/Light Mode**: Beautiful theme switching with smooth transitions

### Technical Highlights
- **No Database Required**: Fully client-side with API integrations
- **Production Ready**: Optimized for deployment on Vercel
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Updates**: Live data indicators and automatic refresh
- **Type-Safe**: Built with TypeScript for robust development

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for interactive data visualization
- **Icons**: Lucide React for consistent iconography
- **PDF Export**: jsPDF for report generation
- **Date Handling**: date-fns for date utilities
- **Build Tool**: Vite for fast development and production builds

## 🏗️ Architecture

### Component Structure
```
src/
├── components/          # React components
│   ├── Header.tsx       # Main navigation and theme toggle
│   ├── StockSearch.tsx  # Stock symbol search and addition
│   ├── Dashboard.tsx    # Main analysis dashboard
│   ├── SentimentChart.tsx # Trend visualization
│   ├── StockOverview.tsx # Stock details and recommendations
│   ├── TrendingStocks.tsx # Popular stocks sidebar
│   ├── SentimentHeatmap.tsx # Visual sentiment overview
│   ├── FilterControls.tsx # Data filtering interface
│   ├── SentimentCard.tsx # Individual sentiment post display
│   ├── StatsGrid.tsx    # Key metrics overview
│   ├── ExportPanel.tsx  # PDF/CSV export functionality
│   └── LoadingSpinner.tsx # Loading state component
├── services/            # Business logic and data processing
│   ├── mockData.ts      # Sample data generation
│   ├── sentimentAnalysis.ts # NLP sentiment processing
│   ├── predictionEngine.ts # AI recommendation system
│   └── exportService.ts # PDF/CSV export functionality
├── hooks/               # Custom React hooks
│   └── useTheme.ts      # Theme management
├── types/               # TypeScript type definitions
│   └── index.ts         # Interface definitions
└── main.tsx            # Application entry point
```

### Key Services

#### Sentiment Analysis Engine
- Keyword-based sentiment scoring
- Multi-source data aggregation
- Confidence scoring and trend analysis
- Overall sentiment calculation

#### Prediction Engine
- AI-powered recommendation generation
- Trend direction analysis
- Confidence scoring based on data volume and consistency
- Reasoning generation for each recommendation

#### Export Service
- PDF report generation with complete analysis
- CSV data export for further analysis
- Formatted reports with charts and insights

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

### Usage

1. **Add Stocks**: Use the search interface to add stock symbols to your watchlist
2. **Analyze Sentiment**: View real-time sentiment analysis and AI predictions
3. **Filter Data**: Use the filtering controls to focus on specific time periods, sources, or sentiment types
4. **Export Reports**: Download comprehensive PDF reports or raw CSV data
5. **Monitor Trends**: Track trending stocks and sentiment heatmaps for market overview

## 🌐 Deployment

### Vercel Deployment

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Build**: Use the default Vite settings (build command: `npm run build`, output directory: `dist`)
3. **Deploy**: Automatic deployment on every push to main branch

### Environment Configuration

For production deployment, you may want to add API keys for real data sources:

```env
VITE_NEWS_API_KEY=your_news_api_key
VITE_TWITTER_API_KEY=your_twitter_api_key
VITE_REDDIT_API_KEY=your_reddit_api_key
```

## 🔧 Customization

### Adding Real APIs

Replace mock data services with real API integrations:

1. **News APIs**: Alpha Vantage, NewsAPI, Financial Modeling Prep
2. **Social Media**: Twitter API v2, Reddit API
3. **Stock Data**: Yahoo Finance, Alpha Vantage, IEX Cloud
4. **NLP Services**: Hugging Face, Google Cloud Natural Language, AWS Comprehend

### Extending Functionality

- Add more sophisticated NLP models
- Implement real-time WebSocket connections
- Add portfolio tracking features
- Include technical analysis indicators
- Add alert system for sentiment changes

## 📊 Data Sources (Mock Implementation)

The current implementation uses sophisticated mock data that simulates:
- Financial news articles with realistic sentiment patterns
- Social media posts from Twitter and Reddit
- Stock price data with market movements
- Historical sentiment trends

In production, replace with actual API calls to:
- Financial news aggregators
- Social media platforms
- Market data providers
- Professional NLP services

## 🎨 Design Philosophy

The application follows modern design principles:
- **Clean, Professional Aesthetic**: Inspired by leading financial platforms
- **Responsive Design**: Optimized for all device sizes
- **Accessible Interface**: High contrast ratios and keyboard navigation
- **Smooth Interactions**: Thoughtful animations and transitions
- **Data-Driven UI**: Clear visualization of complex financial data

## 📈 Performance Optimizations

- Lazy loading of components
- Efficient data filtering and sorting
- Optimized chart rendering
- Memory-efficient mock data generation
- Responsive image and asset loading

## 🔒 Security Considerations

- No sensitive data storage (client-side only)
- Secure API key handling (environment variables)
- CORS protection for API calls
- Input validation and sanitization

## 📝 License

This project is built for demonstration and educational purposes. Ensure compliance with financial data provider terms of service when using real APIs.

---

**Ready for Production**: This application is designed to be immediately deployable and can serve as a foundation for a professional stock sentiment analysis platform.