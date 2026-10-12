"use client";

import { useState, useEffect } from "react";
import { Habit } from "./types";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";

const defaultHabits: Habit[] = [
  { id: "1", name: "Drink water", streak: 3, completedToday: false },
  { id: "2", name: "Read 10 pages", streak: 7, completedToday: false },
  { id: "3", name: "Exercise", streak: 0, completedToday: false },
];

function getToday() {
  return new Date().toLocaleDateString("en-CA");
}

function getYesterday() {
  return new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleDateString("en-CA");
}

function refreshHabits(habits: Habit[]): Habit[] {
  const today = getToday();
  const yesterday = getYesterday();

  return habits.map((habit) => {
    if (habit.lastCompleted === today) return habit;

    const missedADay =
      habit.lastCompleted !== undefined && habit.lastCompleted !== yesterday;

    return {
      ...habit,
      completedToday: false,
      streak: missedADay ? 0 : habit.streak,
    };
  });
}

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) {
      setHabits(refreshHabits(JSON.parse(saved)));
    } else {
      setHabits(refreshHabits(defaultHabits));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  }, [habits, loaded]);

  function markDone(id: string) {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit, 
              streak: habit.streak + 1,
              completedToday: true,
              lastCompleted: getToday(),
            }
          : habit
      )
    );
  }

  function editHabit(id: string, newName: string) {
  setHabits(
    habits.map((habit) =>
      habit.id === id
     ? { 
        ...habit,
         name: newName
      }
      : habit
    )
  );
}

  function addHabit(name: string) {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      streak: 0,
      completedToday: false,
    };
    setHabits([...habits, newHabit]);
  }

  function deleteHabit(id: string) {
    setHabits(habits.filter((habit) => habit.id !== id));
  }

  function deleteAll() {
    if (confirm("Delete all habits? This cannot be undone.")) {
      setHabits([]);
    }
  }

  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-3xl font-semibold tracking-tight text-white">
          My Habits
        </h1>
        <HabitForm onAdd={addHabit} />
        <HabitList
          habits={habits}
          onMarkDone={markDone}
          onDelete={deleteHabit}
          onEdit={editHabit}
        />
        {loaded && habits.length === 0 && (
          <p className="text-center text-neutral-500">
            No habits yet. Add your first one above.
          </p>
        )}
        {habits.length > 0 && (
          <button
            onClick={deleteAll}
            className="mt-8 w-full rounded-lg border border-red-500/30 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            Delete all habits
          </button>
        )}
      </div>
    </main>
  );
}