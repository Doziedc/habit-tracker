import { useState, FormEvent } from "react";

type Props = {
  onAdd: (name: string) => void;
};

export default function HabitForm({ onAdd }: Props) {
  const [newName, setNewName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (newName.trim() === "") return;
    onAdd(newName.trim());
    setNewName("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New habit name"
        className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-neutral-500 outline-none focus:border-violet-500"
      />
      <button
        type="submit"
        className="rounded-lg bg-violet-600 px-4 py-2 font-medium text-white transition hover:bg-violet-500"
      >
        Add
      </button>
    </form>
  );
}