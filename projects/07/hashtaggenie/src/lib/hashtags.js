import hashtagsData from '../data/hashtags.json';

/**
 * Tìm kiếm hashtags dựa trên từ khóa đầu vào
 * @param {string} keyword - Từ khóa người dùng nhập vào
 * @returns {Array} Danh sách hashtags phù hợp
 */
export function searchHashtags(keyword) {
  if (!keyword || typeof keyword !== 'string') {
    return [];
  }

  const normalizedKeyword = keyword.toLowerCase().trim();
  
  // Tìm kiếm trực tiếp trong danh mục
  if (hashtagsData.categories[normalizedKeyword]) {
    return hashtagsData.categories[normalizedKeyword];
  }

  // Tìm kiếm trên tất cả danh mục
  let results = [];
  
  // Tìm hashtags liên quan trong các danh mục
  Object.values(hashtagsData.categories).forEach(category => {
    const matchedTags = category.filter(item => 
      item.tag.toLowerCase().includes(normalizedKeyword)
    );
    results = [...results, ...matchedTags];
  });
  
  // Tìm hashtags liên quan trong trending
  const matchedTrending = hashtagsData.trending.filter(item => 
    item.tag.toLowerCase().includes(normalizedKeyword)
  );
  
  results = [...results, ...matchedTrending];
  
  // Sắp xếp theo mức độ phổ biến
  results.sort((a, b) => b.popularity - a.popularity);
  
  // Loại bỏ các phần tử trùng lặp (nếu có)
  return Array.from(new Map(results.map(item => [item.tag, item])).values());
}

/**
 * Lấy danh sách các danh mục hashtag
 * @returns {Array} Danh sách các danh mục
 */
export function getCategories() {
  return Object.keys(hashtagsData.categories);
}

/**
 * Lấy hashtags theo danh mục
 * @param {string} category - Tên danh mục
 * @returns {Array} Danh sách hashtags trong danh mục
 */
export function getHashtagsByCategory(category) {
  return hashtagsData.categories[category] || [];
}

/**
 * Lấy hashtags đang trending
 * @returns {Array} Danh sách hashtags đang trending
 */
export function getTrendingHashtags() {
  return hashtagsData.trending;
}

/**
 * Kiểm tra giới hạn sử dụng của người dùng
 * @returns {Object} Thông tin về giới hạn sử dụng
 */
export function checkUsageLimit() {
  if (typeof window === 'undefined') {
    return { remaining: 5, isPremium: false };
  }
  
  const today = new Date().toDateString();
  const usageData = JSON.parse(localStorage.getItem('usageData') || '{}');
  
  // Reset nếu ngày thay đổi
  if (usageData.date !== today) {
    const newUsageData = {
      date: today,
      count: 0,
      isPremium: usageData.isPremium || false
    };
    localStorage.setItem('usageData', JSON.stringify(newUsageData));
    return { 
      remaining: 5, 
      isPremium: newUsageData.isPremium 
    };
  }
  
  const remaining = usageData.isPremium ? Infinity : Math.max(0, 5 - usageData.count);
  
  return {
    remaining,
    isPremium: usageData.isPremium || false
  };
}

/**
 * Ghi nhận một lần sử dụng
 */
export function recordUsage() {
  if (typeof window === 'undefined') {
    return;
  }
  
  const today = new Date().toDateString();
  const usageData = JSON.parse(localStorage.getItem('usageData') || '{}');
  
  if (usageData.date !== today) {
    localStorage.setItem('usageData', JSON.stringify({
      date: today,
      count: 1,
      isPremium: usageData.isPremium || false
    }));
    return;
  }
  
  if (!usageData.isPremium) {
    localStorage.setItem('usageData', JSON.stringify({
      ...usageData,
      count: usageData.count + 1
    }));
  }
}

/**
 * Kích hoạt tính năng Premium
 */
export function activatePremium() {
  if (typeof window === 'undefined') {
    return;
  }
  
  const usageData = JSON.parse(localStorage.getItem('usageData') || '{}');
  localStorage.setItem('usageData', JSON.stringify({
    ...usageData,
    isPremium: true
  }));
}