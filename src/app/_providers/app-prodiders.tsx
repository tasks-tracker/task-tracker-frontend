"use client";

import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routerAttached } from "../../shared/lib/router-config";

export function EffectorRouterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const attachRouter = useUnit(routerAttached);

  useEffect(() => {
    attachRouter(router);
  }, [router, attachRouter]);

  return <>{children}</>;
}
