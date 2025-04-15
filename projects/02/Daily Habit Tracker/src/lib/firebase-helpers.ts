import { db } from '@/config/firebase';
import { collection, writeBatch, serverTimestamp, doc } from 'firebase/firestore';
import { HabitData } from '@/types/habit';

let isCreatingHabit = false;
let createHabitTimeout: NodeJS.Timeout | null = null;

export const createHabit = async (habitData: Omit<HabitData, 'createdAt' | 'lastUpdate' | 'status'>) => {
  if (isCreatingHabit) return false;

  // Clear any pending timeouts
  if (createHabitTimeout) {
    clearTimeout(createHabitTimeout);
  }

  // Debounce the create operation
  return new Promise((resolve) => {
    createHabitTimeout = setTimeout(async () => {
      try {
        isCreatingHabit = true;
        const batch = writeBatch(db);
        const newHabitRef = doc(collection(db, 'habits'));
        
        const completeHabitData: HabitData = {
          ...habitData,
          createdAt: serverTimestamp(),
          lastUpdate: serverTimestamp(),
          status: 'active'
        };

        batch.set(newHabitRef, completeHabitData);
        await batch.commit();
        resolve(true);
      } catch (error) {
        console.error('Error in batch write:', error);
        resolve(false);
      } finally {
        isCreatingHabit = false;
        createHabitTimeout = null;
      }
    }, 500); // 500ms debounce
  });
};
