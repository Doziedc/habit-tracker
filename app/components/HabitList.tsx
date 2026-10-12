import { Habit } from "../types";
import HabitCard from "./HabitCard";

type Props = {
  habits: Habit[];
  onMarkDone: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
};

export default function HabitList({ habits, onMarkDone, onDelete, onEdit }: Props) {
  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onMarkDone={onMarkDone}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}