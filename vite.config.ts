import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  preview: {
    port: 6001,
    strictPort: true,
  },
  server: {
    port: 6001,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:6001",
  },
});
