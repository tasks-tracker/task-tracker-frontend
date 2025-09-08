"use client";

import { LoadingSpinner } from "@/shared/ui/loading-spinner";
import { useEffect } from "react";
import { appStarted } from "@/shared/lib/init";
import { useUnit } from "effector-react";
import { $$userModel } from "@/entities/user";

export default function LoadingPage() {
  const startApp = useUnit(appStarted);

  useUnit($$userModel.output.user);

  useEffect(() => {
    startApp();
  }, [startApp]);

  return (
    <div className="min-h-screen flex justify-center">
      <LoadingSpinner size="md" text="Загрузка..." />
    </div>
  );
}
