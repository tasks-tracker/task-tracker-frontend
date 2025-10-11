"use client";

import { Board } from "@/features/dnd-board/ui/board";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 ml-4">Board</h1>
      <Board />
    </div>
  );
}
