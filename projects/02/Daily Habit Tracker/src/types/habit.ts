import { FieldValue } from 'firebase/firestore';

export type HabitStatus = 'active' | 'archived' | 'deleted';

export interface HabitData {
  title: string;
  userId: string;
  isCompleted: boolean;
  streak: number;
  createdAt: FieldValue;
  lastUpdate: FieldValue;
  status: HabitStatus;
}

export interface Habit extends Omit<HabitData, 'createdAt'> {
  id: string;
  createdAt: Date;
}
