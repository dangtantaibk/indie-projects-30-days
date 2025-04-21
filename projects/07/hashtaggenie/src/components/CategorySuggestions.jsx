'use client';

export default function CategorySuggestions({ categories, onSelectCategory }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Danh mục phổ biến</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {category}
          </button>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Không có danh mục nào.</p>
        )}
      </div>
    </div>
  );
}