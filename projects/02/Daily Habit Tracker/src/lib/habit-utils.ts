import { collection, query, where, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Habit } from '@/types';

export const resetHabitsForNewDay = async (userId: string) => {
  const habitsRef = collection(db, 'habits');
  const q = query(habitsRef, where('userId', '==', userId));

  try {
    const snapshot = await getDocs(q);
    const batch = writeBatch(db);
    const now = new Date();

    snapshot.forEach((doc) => {
      const habit = doc.data() as Habit;
      const lastCompletedDate = habit.completedAt ? new Date(habit.completedAt) : null;
      
      // Reset if the habit was completed on a different day
      if (lastCompletedDate && 
          lastCompletedDate.toDateString() !== now.toDateString()) {
        batch.update(doc.ref, {
          isCompleted: false,
          completedAt: null,
          // Reset streak if habit was not completed yesterday
          streak: lastCompletedDate.getDate() === now.getDate() - 1 ? habit.streak : 0
        });
      }
    });

    await batch.commit();
  } catch (error) {
    console.error('Error resetting habits:', error);
  }
};