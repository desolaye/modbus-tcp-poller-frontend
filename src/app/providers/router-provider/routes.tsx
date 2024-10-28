import { Outlet, createRoute, createRootRoute } from "@tanstack/react-router";
import { MainPage } from "@/pages/main";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: MainPage,
});

export const routeTree = rootRoute.addChildren([indexRoute]);
