'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { AddHabit } from '@/components/habits/AddHabit';
import { HabitList } from '@/components/habits/HabitList';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { format } from 'date-fns';

export default function HabitsPage() {
  const { user, loading } = useAuth();
  const { colorScheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const getColorClasses = (colorScheme: string) => {
    const colorMap = {
      indigo: "text-indigo-600 dark:text-indigo-400",
      emerald: "text-emerald-600 dark:text-emerald-400",
      rose: "text-rose-600 dark:text-rose-400",
      amber: "text-amber-600 dark:text-amber-400"
    };
    return colorMap[colorScheme as keyof typeof colorMap] || colorMap.indigo;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Habits</h1>
              <span className={`text-sm ${getColorClasses(colorScheme)}`}>
                {format(new Date(), 'EEEE, MMMM d')}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Track your daily habits and build lasting routines.
            </p>
          </div>

          <ErrorBoundary>
            <div className="mb-6">
              <AddHabit />
            </div>
          </ErrorBoundary>

          <ErrorBoundary>
            <HabitList />
          </ErrorBoundary>

          {!user.isPremium && (
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                Want more features?
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Upgrade to Premium to unlock unlimited habits, detailed progress tracking, and more.
              </p>
              <button
                onClick={() => router.push('/premium')}
                className={`mt-3 text-sm font-medium ${getColorClasses(colorScheme)} hover:underline`}
              >
                Learn more about Premium →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}