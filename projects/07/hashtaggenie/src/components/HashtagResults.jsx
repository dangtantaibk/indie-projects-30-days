'use client';

import { useState } from 'react';
import HashtagCard from './HashtagCard';

export default function HashtagResults({ hashtags, keyword }) {
  const [selectedTags, setSelectedTags] = useState([]);
  const [copied, setCopied] = useState(false);

  // Xử lý copy tất cả
  const handleCopyAll = () => {
    if (hashtags.length === 0) return;
    
    const allTags = hashtags.map(tag => `#${tag.tag}`).join(' ');
    navigator.clipboard.writeText(allTags);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="w-full">
      {keyword && hashtags.length > 0 && (
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">
            Kết quả cho <span className="text-blue-600">"{keyword}"</span>
          </h2>
          <button
            onClick={handleCopyAll}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition-colors`}
          >
            {copied ? 'Đã copy!' : 'Copy tất cả'}
          </button>
        </div>
      )}

      {hashtags.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hashtags.map((hashtag) => (
            <HashtagCard
              key={hashtag.tag}
              tag={hashtag.tag}
              popularity={hashtag.popularity}
            />
          ))}
        </div>
      ) : keyword ? (
        <div className="bg-yellow-50 dark:bg-gray-700 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                Không tìm thấy hashtag nào cho "<strong>{keyword}</strong>". Hãy thử một từ khóa khác.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}