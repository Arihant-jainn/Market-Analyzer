import React from 'react';
import { TrendingUp, MessageSquare, BarChart3, Users } from 'lucide-react';

interface StatsGridProps {
  totalPosts: number;
  positivePercentage: number;
  negativePercentage: number;
  avgSentimentScore: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  totalPosts,
  positivePercentage,
  negativePercentage,
  avgSentimentScore,
}) => {
  const stats = [
    {
      label: 'Total Data Points',
      value: totalPosts.toLocaleString(),
      icon: MessageSquare,
      color: 'text-primary-600 dark:text-primary-400',
      bgColor: 'bg-primary-100 dark:bg-primary-900/30',
    },
    {
      label: 'Positive Sentiment',
      value: `${positivePercentage.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-success-600 dark:text-success-400',
      bgColor: 'bg-success-100 dark:bg-success-900/30',
    },
    {
      label: 'Negative Sentiment',
      value: `${negativePercentage.toFixed(1)}%`,
      icon: BarChart3,
      color: 'text-danger-600 dark:text-danger-400',
      bgColor: 'bg-danger-100 dark:bg-danger-900/30',
    },
    {
      label: 'Average Score',
      value: `${(avgSentimentScore * 100).toFixed(1)}%`,
      icon: Users,
      color: 'text-warning-600 dark:text-warning-400',
      bgColor: 'bg-warning-100 dark:bg-warning-900/30',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;