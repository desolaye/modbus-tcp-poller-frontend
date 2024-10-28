import { createRouter, RouterProvider as Router } from "@tanstack/react-router";
import { routeTree } from "./routes";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const RouterProvider = () => {
  return <Router router={router} />;
};
