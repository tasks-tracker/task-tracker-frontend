import { api } from "@/shared/api";
import { UserResponse } from "@/shared/api/generated";
import { appStarted } from "@/shared/lib/init";
import { navigationTriggered } from "@/shared/lib/router-config";
import { createEffect, createStore, sample } from "effector";

const $user = createStore<UserResponse | null>(null);

const userFx = createEffect(async () => {
  return await api.me();
});

$user.on(userFx.doneData, (_, data) => data);

sample({
  clock: appStarted,
  target: userFx,
});

sample({
  clock: userFx.done,
  fn: () => "/dashboard",
  target: navigationTriggered,
});

sample({
  clock: userFx.fail,
  fn: () => "/sign-in",
  target: navigationTriggered,
});

export const $$userModel = {
  output: {
    user: $user,
  },
  input: {
    userFx,
  },
};
