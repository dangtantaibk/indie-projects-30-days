'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { auth } from '@/config/firebase';

export function Navbar() {
  const router = useRouter();
  const { user } = useAuth();
  const { theme, colorScheme } = useTheme();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer" 
              onClick={() => router.push('/')}
            >
              <span className={`text-xl font-bold ${getColorClasses(colorScheme)}`}>
                HabitTracker
              </span>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <button
                  onClick={() => router.push('/habits')}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Habits
                </button>
                <button
                  onClick={() => router.push('/premium')}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Premium
                </button>
                <button
                  onClick={handleSignOut}
                  className="ml-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push('/auth')}
                className={`${getColorClasses(colorScheme)} hover:text-opacity-80 px-3 py-2 rounded-md text-sm font-medium`}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}