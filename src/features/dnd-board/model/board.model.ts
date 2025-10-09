import { createEffect, createStore, sample } from "effector";
import { getDefaultBoard } from "../api/board.api";
import { createGate } from "effector-react";
import { $user } from "@/entities/user";
import { BoardResponse } from "@/shared/api/generated";

export const DashboardGate = createGate();

export const fetchBoardFx = createEffect(async (userId: string) => {
  return getDefaultBoard(userId);
});

const savedBoard = (() => {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("board");
    return raw ? (JSON.parse(raw) as BoardResponse) : null;
  }
  return null;
})();

export const $board = createStore<BoardResponse | null>(savedBoard).on(
  fetchBoardFx.doneData,
  (_, board) => board,
);

$board.watch((board) => {
  if (board) {
    localStorage.setItem("board", JSON.stringify(board));
  }
});

sample({
  clock: DashboardGate.open,
  source: $user,
  filter: (user): user is { id: string } => Boolean(user?.id),
  fn: (user) => user!.id,
  target: fetchBoardFx,
});
