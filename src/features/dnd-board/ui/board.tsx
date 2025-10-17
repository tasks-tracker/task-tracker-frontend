"use client";

import { useGate, useUnit } from "effector-react";
import { $$boardModel } from "../model/board.model";
import { Column } from "./task-column";
import { ColumnType } from "@/shared/api/generated";

export function Board() {
  useGate($$boardModel.gates.DashboardGate);

  const { columns, isLoading } = useUnit({
    board: $$boardModel.output.board,
    columns: $$boardModel.output.columns,
    isLoading: $$boardModel.output.boardPending,
  });

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div className="flex gap-4 overflow-x-auto h-screen p-4">
      {columns.map((column: ColumnType) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
}
