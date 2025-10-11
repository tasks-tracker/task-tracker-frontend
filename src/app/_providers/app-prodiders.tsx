"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routerAttached } from "../../shared/lib/router-config";
import { appStarted } from "@/shared/lib/init";
import "@/entities/user";

export function EffectorRouterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    routerAttached(router);
    appStarted();
  }, []);

  return <>{children}</>;
}
