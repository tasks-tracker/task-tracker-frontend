import { z } from "zod";

export const signInSchema = z.object({
  login: z
    .string()
    .min(1, "Логин обязателен")
    .min(3, "Логин должен содержать минимум 3 символа")
    .max(50, "Логин не должен превышать 50 символов")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Логин может содержать только буквы, цифры и подчеркивания",
    ),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(8, "Пароль должен содержать минимум 8 символов")
    .max(100, "Пароль не должен превышать 100 символов"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
