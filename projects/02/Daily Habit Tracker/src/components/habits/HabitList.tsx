'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { Habit } from '@/types';
import { resetHabitsForNewDay } from '@/lib/habit-utils';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

export function HabitList() {
  const { user } = useAuth();
  const { colorScheme } = useTheme();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    habitId?: string;
    habitTitle?: string;
  }>({ isOpen: false });

  useEffect(() => {
    if (!user) return;

    let mounted = true;

    const loadHabits = async () => {
      try {
        // Reset habits for the new day
        await resetHabitsForNewDay(user.uid);
        
        const habitsQuery = query(
          collection(db, 'habits'),
          where('userId', '==', user.uid)
        );

        const unsubscribe = onSnapshot(habitsQuery, (snapshot) => {
          if (!mounted) return;

          const habitData: Habit[] = [];
          snapshot.forEach((doc) => {
            habitData.push({ id: doc.id, ...doc.data() } as Habit);
          });
          setHabits(habitData.sort((a, b) => 
            (b.streak || 0) - (a.streak || 0)
          ));
          setLoading(false);
          setError('');
        }, (err) => {
          console.error('Error loading habits:', err);
          setError('Failed to load habits. Please try again later.');
          setLoading(false);
        });

        return unsubscribe;
      } catch (err) {
        console.error('Error in loadHabits:', err);
        if (mounted) {
          setError('Failed to load habits. Please try again later.');
          setLoading(false);
        }
      }
    };

    loadHabits();

    return () => {
      mounted = false;
    };
  }, [user]);

  const toggleHabit = async (habit: Habit) => {
    if (updating) return;
    
    setUpdating(habit.id);
    setError('');
    
    try {
      const habitRef = doc(db, 'habits', habit.id);
      const now = new Date();
      const isCompletingToday = !habit.isCompleted;

      await updateDoc(habitRef, {
        isCompleted: isCompletingToday,
        completedAt: isCompletingToday ? now : null,
        streak: isCompletingToday ? (habit.streak || 0) + 1 : Math.max(0, (habit.streak || 0) - 1)
      });
    } catch (err) {
      console.error('Error updating habit:', err);
      setError('Failed to update habit. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  const confirmDelete = (habit: Habit) => {
    setDeleteConfirm({
      isOpen: true,
      habitId: habit.id,
      habitTitle: habit.title
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.habitId || updating) return;
    
    setUpdating(deleteConfirm.habitId);
    setError('');
    
    try {
      await deleteDoc(doc(db, 'habits', deleteConfirm.habitId));
      setDeleteConfirm({ isOpen: false });
    } catch (err) {
      console.error('Error deleting habit:', err);
      setError('Failed to delete habit. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="py-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const getButtonClass = (colorScheme: string) => {
    const baseClass = "p-2 rounded-full transition-colors";
    const colorClasses = {
      indigo: "text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30",
      emerald: "text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30",
      rose: "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/30",
      amber: "text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30"
    };
    return `${baseClass} ${colorClasses[colorScheme as keyof typeof colorClasses]}`;
  };

  return (
    <>
      <div className="space-y-4">
        {error && <ErrorMessage message={error} />}
        
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow ${
              updating === habit.id ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={habit.isCompleted}
                  onChange={() => toggleHabit(habit)}
                  disabled={updating === habit.id}
                  className={`h-6 w-6 rounded border-gray-300 dark:border-gray-600 
                             focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 
                             ${getButtonClass(colorScheme).split(' ')[0]}`}
                />
                {updating === habit.id && (
                  <div className="absolute -top-1 -left-1">
                    <LoadingSpinner size="sm" />
                  </div>
                )}
              </div>
              <div>
                <span className={`${
                  habit.isCompleted 
                    ? 'line-through text-gray-500 dark:text-gray-400' 
                    : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {habit.title}
                </span>
                {habit.streak > 0 && (
                  <span className={`ml-2 text-sm ${getButtonClass(colorScheme).split(' ')[0]}`}>
                    🔥 {habit.streak} day{habit.streak !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => confirmDelete(habit)}
              disabled={updating === habit.id}
              className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        {habits.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No habits added yet. Start by adding a new habit above!</p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false })}
        onConfirm={handleDeleteConfirm}
        title="Delete Habit"
        message={`Are you sure you want to delete "${deleteConfirm.habitTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}