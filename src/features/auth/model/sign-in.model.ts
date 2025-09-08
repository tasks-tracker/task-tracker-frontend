import { navigationTriggered } from "@/shared/lib/router-config";
import { createEffect, createEvent, createStore, sample } from "effector";
import { SignInFormData } from "./schemas/sign-in.schema";
import { api } from "@/shared/api";

const $message = createStore<string | null>(null);
const $error = createStore<string | null>(null);

const loginFx = createEffect(
  async ({ login, password }: { login: string; password: string }) => {
    const response = await api.login({ login, password });
    return response;
  },
);

const formSubmitted = createEvent<SignInFormData>();

$message.on(loginFx.doneData, (_, { message }) => message);
$error.on(loginFx.failData, (_, data) => data.message);

sample({
  clock: formSubmitted,
  fn: ({ login, password }) => ({ login, password }),
  target: loginFx,
});
sample({
  clock: loginFx.done,
  fn: () => "/dashboard",
  target: navigationTriggered,
});

export const $$signInModel = {
  input: {
    formSubmitted,
  },
  output: {
    message: $message,
    error: $error,
  },
};
