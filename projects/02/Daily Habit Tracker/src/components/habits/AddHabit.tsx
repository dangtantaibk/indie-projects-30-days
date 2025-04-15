'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { useRouter } from 'next/navigation';
import { FirebaseError } from 'firebase/app';
import { HabitData } from '@/types/habit';
import { createHabit } from '@/lib/firebase-helpers';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export function AddHabit() {
  const [title, setTitle] = useState('');
  const [habitCount, setHabitCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { user } = useAuth();
  const { colorScheme } = useTheme();
  const router = useRouter();

  const fetchHabitCount = useCallback(async () => {
    if (!user?.uid) return;

    try {
      const habitsQuery = query(
        collection(db, 'habits'),
        where('userId', '==', user.uid)
      );
      const snapshot = await getDocs(habitsQuery);
      setHabitCount(snapshot.size);
    } catch (error) {
      console.error('Error fetching habit count:', error);
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchHabitCount();
        }, RETRY_DELAY * (retryCount + 1));
      }
    }
  }, [user, retryCount]);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | undefined;

    const initializeHabitCount = async () => {
      if (!user) return;

      try {
        const habitsQuery = query(
          collection(db, 'habits'),
          where('userId', '==', user.uid)
        );
        
        // Set up real-time listener
        unsubscribe = onSnapshot(habitsQuery, 
          (snapshot) => {
            if (isMounted) {
              setHabitCount(snapshot.size);
            }
          },
          (error) => {
            console.error('Snapshot listener error:', error);
          }
        );
      } catch (error) {
        console.error('Error initializing habits:', error);
      }
    };

    initializeHabitCount();

    // Cleanup function
    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const getColorClasses = (colorScheme: string) => {
    const colorMap = {
      indigo: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
      emerald: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
      rose: "bg-rose-600 hover:bg-rose-700 focus:ring-rose-500",
      amber: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
    };
    return colorMap[colorScheme as keyof typeof colorMap] || colorMap.indigo;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.uid) {
      console.error('No authenticated user found');
      return;
    }
    
    const trimmedTitle = title.trim();
    if (!trimmedTitle || !user || isLoading) return;

    try {
      setIsLoading(true);
      if (!user.isPremium && habitCount >= 3) {
        router.push('/premium');
        return;
      }

      // Add form validation
      if (trimmedTitle.length < 1 || trimmedTitle.length > 50) {
        alert('Title must be between 1 and 50 characters');
        return;
      }

      const success = await createHabit({
        title: trimmedTitle,
        userId: user.uid,
        isCompleted: false,
        streak: 0,
      });

      if (success) {
        setTitle('');
      } else {
        throw new Error('Failed to create habit');
      }
    } catch (error) {
      console.error('Error adding habit:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to add habit. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [title, user, isLoading, habitCount, router]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new habit..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     bg-white dark:bg-gray-800 
                     text-gray-900 dark:text-gray-100 
                     placeholder-gray-500 dark:placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            maxLength={50}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded-md 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                       transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       ${getColorClasses(colorScheme)}`}
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>
      {!user?.isPremium && habitCount >= 3 && (
        <div className="text-center text-red-600 mb-4">
          You&apos;ve reached the maximum number of habits for the free tier.{' '}
          <Link href="/premium" className="text-blue-600 hover:text-blue-800">
            Upgrade to Premium
          </Link>
        </div>
      )}
    </div>
  );
}