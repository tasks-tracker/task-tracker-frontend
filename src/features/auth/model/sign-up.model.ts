import { api } from "@/shared/api";
import { navigationTriggered } from "@/shared/lib/router-config";
import { createEffect, createEvent, createStore, sample } from "effector";
import { SignUpFormData } from "./schemas/sign-up.schema";

const $message = createStore<string | null>(null);
const $error = createStore<string | null>(null);

const signupFx = createEffect(
  async ({ login, password }: { login: string; password: string }) => {
    const response = await api.registerByLogin({ login, password });
    return response;
  },
);

const formSubmitted = createEvent<SignUpFormData>();

$message.on(signupFx.doneData, (_, { message }) => message);
$error.on(signupFx.failData, (_, data) => data.message);

sample({
  clock: formSubmitted,
  fn: ({ login, password }) => ({ login, password }),
  target: signupFx,
});

sample({
  clock: signupFx.done,
  fn: () => "/sign-in",
  target: navigationTriggered,
});

export const $$signUpModel = {
  input: {
    formSubmitted,
  },
  output: {
    message: $message,
    error: $error,
  },
};
