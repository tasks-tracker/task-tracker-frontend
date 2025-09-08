import { attach, createEvent, createStore, sample } from "effector";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const routerAttached = createEvent<AppRouterInstance>();
const navigationTriggered = createEvent<string>();

const $router = createStore<AppRouterInstance | null>(null).on(
  routerAttached,
  (_, router) => router,
);

const navigateFx = attach({
  source: $router,
  effect: (router, path) => {
    if (!router) return;
    return router.push(path);
  },
});

sample({
  clock: navigationTriggered,
  target: navigateFx,
});

export { navigationTriggered, routerAttached };
