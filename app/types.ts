export type Habit = {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
  lastCompleted?: string;
};