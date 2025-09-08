import { z } from "zod";

export const signUpSchema = z
  .object({
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
      .max(100, "Пароль не должен превышать 100 символов")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Пароль должен содержать минимум одну строчную букву, одну заглавную букву и одну цифру",
      ),
    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
