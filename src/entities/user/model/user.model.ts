import { api } from "@/shared/api";
import { UserResponseUserInfo } from "@/shared/api/generated";
import { appStarted } from "@/shared/lib/init";
import { navigationTriggered } from "@/shared/lib/router-config";
import { createEffect, createStore, sample } from "effector";

export const $user = createStore<UserResponseUserInfo | null>(null);

const userFx = createEffect(async () => {
  return await api.me();
});

$user.on(userFx.doneData, (_, data) => data.userInfo);

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
    fetchUser: userFx,
  },
  input: {
    userFx,
  },
};
