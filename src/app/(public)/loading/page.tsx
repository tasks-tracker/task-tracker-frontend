"use client";

import { LoadingSpinner } from "@/shared/ui/loading-spinner";

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex justify-center">
      <LoadingSpinner size="md" text="Загрузка..." />
    </div>
  );
}
