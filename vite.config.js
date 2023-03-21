import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        background: "src/background.js",
        content: "src/content.js",
        index: "index.html",
      },
      output: {
        entryFileNames: "[name].js",
        format: "esm",
      },
    },
  },
});
