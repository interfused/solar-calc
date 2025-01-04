import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "",
  build: {
    rollupOptions: {
      // Avoid bundling test files
      input: {
        main: "src/main.tsx",
      },
    },
  },
  esbuild: {
    // Exclude test files during the build
    exclude: [
      "**/__tests__/**",
      "**/*.test.*",
      "**/*.spec.*",
      "**/jest.setup.ts",
    ],
  },
});
