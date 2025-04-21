'use client';

import { useState } from 'react';

/**
 * Component hiển thị một hashtag cùng với mức độ phổ biến và nút copy
 */
export default function HashtagCard({ tag, popularity }) {
  const [copied, setCopied] = useState(false);
  const hashtagText = `#${tag}`;

  // Xử lý copy vào clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(hashtagText);
    setCopied(true);
    
    // Đặt lại trạng thái sau 2 giây
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Tính toán màu dựa vào mức độ phổ biến
  const getPopularityColor = () => {
    if (popularity >= 85) return 'bg-green-500';
    if (popularity >= 70) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition-shadow">
      <div className="flex-1">
        <div className="flex items-center">
          <span className="text-lg font-medium text-gray-900 dark:text-white">{hashtagText}</span>
          <div className="ml-2 flex items-center">
            <div className={`w-3 h-3 rounded-full ${getPopularityColor()}`}></div>
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{popularity}/100</span>
          </div>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className={`ml-3 px-3 py-2 text-xs font-semibold rounded-md ${
          copied 
            ? 'bg-green-500 text-white' 
            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
        } transition-colors`}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}