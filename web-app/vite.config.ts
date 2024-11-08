import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Exclude the webui package from the build, it will not cache the webui package
  optimizeDeps: {
    exclude: ["webui"],
  },
});
