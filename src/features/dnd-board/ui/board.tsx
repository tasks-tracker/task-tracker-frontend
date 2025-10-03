"use client";

import { useUnit } from "effector-react";
import { $board } from "../model/board.model";
import { Column } from "./task-column";
import type { ColumnType } from "@/entities/column/model/types";

export function Board() {
  const board = useUnit($board);

  if (!board) return <p>Загрузка...</p>;

  return (
    <div className="flex gap-4 overflow-x-auto h-screen p-4">
      {board.columns.map((column: ColumnType) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
}
