import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@components/*": path.resolve(import.meta.dirname, "./src/components"),
      "@api/*": path.resolve(import.meta.dirname, "./src/api"),
      "@schemas/*": path.resolve(import.meta.dirname, "./src/schemas"),
    },
  },
});
