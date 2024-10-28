import { MainPage } from "@/pages/main";

import "./styles/index.css";

export const App = () => {
  const ENV_URL = import.meta.env.VITE_PUBLIC_API_URL;

  if (!ENV_URL || typeof ENV_URL !== "string") {
    throw new Error("ENV переменная VITE_PUBLIC_API_URL не определена");
  }

  return <MainPage />;
};
