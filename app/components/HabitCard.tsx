import { Habit } from "../types";
import { useState } from "react";

type Props = {
  habit: Habit;
  onMarkDone: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newName: string) => void;
};

export default function HabitCard({ habit, onMarkDone, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draftName, setDraftName] = useState<string>(habit.name);

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
      {isEditing ? (
        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && draftName.trim() !== "") {
                onEdit(habit.id, draftName);
                setIsEditing(false);
              }
            }}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white outline-none focus:border-violet-500 sm:flex-1"
          />
          <button
            onClick={() => {
              onEdit(habit.id, draftName);
              setIsEditing(false);
            }}
            disabled={draftName.trim() === ""}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              draftName.trim() === ""
                ? "cursor-not-allowed bg-white/10 text-neutral-500"
                : "bg-violet-600 text-white hover:bg-violet-500"
            }`}
          >
            Save
          </button>
          <button
            onClick={() => {
              setDraftName(habit.name);
              setIsEditing(false);
            }}
            className="rounded-lg px-3 py-2 text-sm text-neutral-400 transition hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="min-w-0">
            <h2 className="text-lg font-medium break-words text-white">{habit.name}</h2>
            <p className="text-sm text-neutral-400">🔥 {habit.streak} day streak</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onMarkDone(habit.id)}
              disabled={habit.completedToday}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
                habit.completedToday
                  ? "cursor-not-allowed bg-white/10 text-neutral-500"
                  : "bg-violet-600 text-white hover:bg-violet-500"
              }`}
            >
              {habit.completedToday ? "Done today" : "Mark done"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg px-3 py-2 text-sm text-neutral-400 transition whitespace-nowrap hover:bg-white/10 hover:text-white"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(habit.id)}
              className="rounded-lg px-3 py-2 text-sm text-neutral-400 transition whitespace-nowrap hover:bg-red-500/20 hover:text-red-400"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}