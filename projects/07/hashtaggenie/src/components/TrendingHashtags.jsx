'use client';

import { useState, useEffect } from 'react';
import HashtagCard from './HashtagCard';

export default function TrendingHashtags() {
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTrending() {
      try {
        const response = await fetch('/api/hashtags?action=trending');
        const data = await response.json();
        
        if (data.hashtags) {
          setTrendingHashtags(data.hashtags);
        }
      } catch (err) {
        console.error('Error fetching trending hashtags:', err);
        setError('Không thể tải hashtag đang thịnh hành');
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrending();
  }, []);

  if (isLoading) {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Hashtags đang thịnh hành</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-100 dark:bg-gray-600 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Hashtags đang thịnh hành</h3>
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-400 p-4 rounded-md">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Hashtags đang thịnh hành</h3>
      {trendingHashtags.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingHashtags.map((hashtag) => (
            <HashtagCard
              key={hashtag.tag}
              tag={hashtag.tag}
              popularity={hashtag.popularity}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">Không có hashtag đang thịnh hành.</p>
      )}
    </div>
  );
}