"use client";

import { useEffect } from "react";
import { useGate, useUnit } from "effector-react";
import { $$signInModel } from "@/features/auth";
import {
  fetchBoardFx,
  $board,
  DashboardGate,
} from "@/features/dnd-board/model/board.model";
import { Board } from "@/features/dnd-board/ui/board";

export default function DashboardPage() {
  const board = useUnit($board);

  useGate(DashboardGate);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 ml-4">Board</h1>
      {board ? <Board /> : <p>Loading board...</p>}
    </div>
  );
}
