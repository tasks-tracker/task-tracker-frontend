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
import { $$signUpModel } from "../model/sign-up.model";
import { signUpSchema, SignUpFormData } from "../model/schemas/sign-up.schema";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
=======
import Link from "next/link";


export function SignUpForm() {
  const { message, error } = useUnit($$signUpModel.output);
  const { formSubmitted } = useUnit($$signUpModel.input);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      login: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    formSubmitted(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
        <CardDescription>
          Введите данные для создания нового аккаунта
        </CardDescription>
        <CardAction>
          <Button variant="link">
            <Link href="/sign-in">Войти</Link>
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

            <div className="grid gap-2 relative flex items-center w-full">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Введите пароль"
                {...register("password")}
                className={`w-full pr-10 ${errors.password ? "border-red-500" : "pr-10"}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/5 z-20"
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

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="grid gap-2 relative flex items-center w-full">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Подтвердите пароль"
                {...register("confirmPassword")}
                className={`w-full pr-10 ${errors.password ? "border-red-500" : "pr-10"}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/5 z-20"
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
              <input
                type="submit"
                style={{ display: "none" }}
                aria-hidden="true"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
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
          {isSubmitting ? "Создание аккаунта..." : "Создать аккаунт"}
        </Button>
        <Button variant="outline" className="w-full">
          Войти через Google
        </Button>
      </CardFooter>
    </Card>
  );
}
