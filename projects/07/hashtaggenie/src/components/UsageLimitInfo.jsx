'use client';

import { useState } from 'react';
import { activatePremium } from '@/lib/hashtags';

export default function UsageLimitInfo({ usageLimit }) {
  const [isPremium, setIsPremium] = useState(usageLimit.isPremium);

  // Xử lý kích hoạt premium
  const handleActivatePremium = () => {
    activatePremium();
    setIsPremium(true);
  };

  if (isPremium) {
    return (
      <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Gói Premium</h3>
            <div className="mt-2 text-sm text-green-700 dark:text-green-400">
              <p>Bạn đang sử dụng gói premium với lượt tìm kiếm không giới hạn.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Giới hạn sử dụng</h3>
            <button
              onClick={handleActivatePremium}
              className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Nâng cấp
            </button>
          </div>
          <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
            <p>Bạn còn <span className="font-semibold">{usageLimit.remaining}</span> lượt tìm kiếm hôm nay.</p>
          </div>
        </div>
      </div>
    </div>
  );
}