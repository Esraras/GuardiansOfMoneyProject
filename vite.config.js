import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // Base path for GitHub Pages (repo pages). Update to your repository name if different.
  base: "/GuardiansOfMoneyProject/",
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
