"use client";

import { Board } from "@/features/dnd-board/ui/board";
import { $$boardModel } from "@/features/dnd-board/model/board.model";
import { useUnit } from "effector-react";
import { Pencil } from "lucide-react";

export default function DashboardPage() {
  const { board } = useUnit({
    board: $$boardModel.output.board,
  });
  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold ">{board?.board.title}</h1>
        <div className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-accent cursor-pointer transition-colors">
          <Pencil className="h-3.5 w-3.5" />
        </div>
      </div>
      <Board />
    </div>
  );
}
