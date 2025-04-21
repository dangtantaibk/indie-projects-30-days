'use client';

import { useState, useEffect } from 'react';
import SearchForm from '@/components/SearchForm';
import HashtagResults from '@/components/HashtagResults';
import CategorySuggestions from '@/components/CategorySuggestions';
import UsageLimitInfo from '@/components/UsageLimitInfo';
import { getCategories, checkUsageLimit, recordUsage } from '@/lib/hashtags';

export default function Home() {
  const [hashtags, setHashtags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [usageLimit, setUsageLimit] = useState({ remaining: 5, isPremium: false });
  const [error, setError] = useState('');

  // Lấy danh sách các danh mục khi component được mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/hashtags?action=categories');
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    }

    // Kiểm tra giới hạn sử dụng
    const limit = checkUsageLimit();
    setUsageLimit(limit);

    fetchCategories();
  }, []);

  // Xử lý tìm kiếm
  const handleSearch = async (searchKeyword) => {
    setError('');
    setIsLoading(true);
    
    // Kiểm tra giới hạn sử dụng
    const limit = checkUsageLimit();
    setUsageLimit(limit);
    
    if (limit.remaining <= 0 && !limit.isPremium) {
      setError('Bạn đã đạt giới hạn tìm kiếm hôm nay. Vui lòng nâng cấp để tiếp tục.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/hashtags?keyword=${encodeURIComponent(searchKeyword)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Có lỗi xảy ra khi tìm kiếm');
      }
      
      setHashtags(data.hashtags || []);
      setKeyword(searchKeyword);
      
      // Ghi nhận lần sử dụng
      if (!limit.isPremium) {
        recordUsage();
        setUsageLimit(checkUsageLimit());
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm hashtag:', error);
      setError('Có lỗi xảy ra khi tìm kiếm hashtag. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý chọn danh mục
  const handleSelectCategory = async (category) => {
    setError('');
    setIsLoading(true);
    
    // Kiểm tra giới hạn sử dụng
    const limit = checkUsageLimit();
    setUsageLimit(limit);
    
    if (limit.remaining <= 0 && !limit.isPremium) {
      setError('Bạn đã đạt giới hạn tìm kiếm hôm nay. Vui lòng nâng cấp để tiếp tục.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/hashtags?action=category&keyword=${encodeURIComponent(category)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Có lỗi xảy ra khi tải hashtag');
      }
      
      setHashtags(data.hashtags || []);
      setKeyword(category);
      
      // Ghi nhận lần sử dụng
      if (!limit.isPremium) {
        recordUsage();
        setUsageLimit(checkUsageLimit());
      }
    } catch (error) {
      console.error('Lỗi khi tải hashtag theo danh mục:', error);
      setError('Có lỗi xảy ra khi tải hashtag. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">HashtagGenie</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Tìm kiếm hashtag phù hợp cho nội dung mạng xã hội của bạn
          </p>
        </header>

        {/* Thông tin giới hạn sử dụng */}
        <UsageLimitInfo usageLimit={usageLimit} />

        {/* Form tìm kiếm */}
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {/* Thông báo lỗi */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 mb-6 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Danh mục gợi ý */}
        {categories.length > 0 && (
          <CategorySuggestions 
            categories={categories} 
            onSelectCategory={handleSelectCategory} 
          />
        )}

        {/* Kết quả tìm kiếm */}
        <HashtagResults hashtags={hashtags} keyword={keyword} />

        <footer className="mt-16 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2023 HashtagGenie | Công cụ gợi ý hashtag thông minh</p>
        </footer>
      </div>
    </main>
  );
}
