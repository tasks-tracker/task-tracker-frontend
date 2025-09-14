"use client";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { useUnit } from "effector-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { $$signInModel } from "../model/sign-in.model";
import { signInSchema, SignInFormData } from "../model/schemas/sign-in.schema";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import Link from "next/link";

export function SignInForm() {
  const { message, error } = useUnit($$signInModel.output);
  const { formSubmitted } = useUnit($$signInModel.input);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInFormData) => {
    formSubmitted(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Войти в аккаунт</CardTitle>
        <CardDescription>
          Введите свои данные для входа в систему
        </CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href="/sign-up">Создать аккаунт</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="login">Логин</Label>
              <Input
                id="login"
                type="text"
                placeholder="Введите логин"
                {...register("login")}
                className={errors.login ? "border-red-500" : ""}
              />
              {errors.login && (
                <p className="text-sm text-red-500">{errors.login.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Пароль</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Забыли пароль?
                </a>
              </div>

              <div className="relative w-full">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Введите пароль"
                  {...register("password")}
                  className={`w-full pr-10 ${errors.password ? "border-red-500" : ""}`}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className={
                        errors.password ? "text-red-500" : "text-gray-600"
                      }
                    />
                  ) : (
                    <Eye
                      size={18}
                      className={
                        errors.password ? "text-red-500" : "text-gray-600"
                      }
                    />
                  )}
                </Button>
              </div>

              <input
                type="submit"
                style={{ display: "none" }}
                aria-hidden="true"
              />

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {message && <p className="text-green-500">{message}</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? "Вход..." : "Войти"}
        </Button>
        <Button variant="outline" className="w-full">
          Войти через Google
        </Button>
      </CardFooter>
    </Card>
  );
}
