'use client';

import { useTheme } from '@/lib/theme-context';

interface ErrorFallbackProps {
  error?: Error;
}

export function ErrorFallback({ error }: ErrorFallbackProps) {
  const { colorScheme } = useTheme();

  const getColorClasses = (scheme: string) => {
    const colorMap = {
      indigo: "text-indigo-600 dark:text-indigo-400",
      emerald: "text-emerald-600 dark:text-emerald-400",
      rose: "text-rose-600 dark:text-rose-400",
      amber: "text-amber-600 dark:text-amber-400"
    };
    return colorMap[scheme as keyof typeof colorMap] || colorMap.indigo;
  };

  return (
    <div className="min-h-[200px] flex items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {error?.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className={`text-sm font-medium ${getColorClasses(colorScheme)} hover:underline`}
        >
          Try refreshing the page
        </button>
      </div>
    </div>
  );
}