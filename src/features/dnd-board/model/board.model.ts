import { BoardResponse, UserResponse } from "@/shared/api/generated";
import { createEffect, createStore, sample } from "effector";
import { api } from "@/shared/api";
import { $$userModel } from "@/entities/user";

const $board = createStore<BoardResponse | null>(null);

const getFullBoardFx = createEffect(async (userId: string) => {
  return await api.getFullBoard({ params: { userId } });
});

$board.on(getFullBoardFx.doneData, (_, data) => data);
// TODO: работаем братья
sample({
  source: $$userModel.output.user,
  clock: $$userModel.output.user,
  filter: (user): user is UserResponse => user !== null,
  fn: (user) => user?.id,
  target: getFullBoardFx,
});

export const $$boardModel = {};
