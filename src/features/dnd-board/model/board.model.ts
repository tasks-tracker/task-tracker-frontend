import { createEffect, createStore } from "effector";
import { getDefaultBoard } from "../api/board.api";
import { BoardResponse } from "./types";

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
