"use client";

import { useGate } from "effector-react";
import { AppGate } from "@/shared/lib/app.gate";

interface AppGateProviderProps {
  children: React.ReactNode;
}

export function AppGateProvider({ children }: AppGateProviderProps) {
  useGate(AppGate);
  return <>{children}</>;
}
