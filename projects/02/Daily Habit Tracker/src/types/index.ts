export type User = {
  id: string;
  email: string;
  isPremium: boolean;
  createdAt: Date;
};

export type Habit = {
  id: string;
  userId: string;
  title: string;
  isCompleted: boolean;
  completedAt?: Date;
  streak: number;
  createdAt: Date;
};

export type Reminder = {
  id: string;
  habitId: string;
  userId: string;
  time: string;
  isEnabled: boolean;
};