import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import path from "path";
import react from "@vitejs/plugin-react";
// Generate .d.ts files for your components
import dts from "vite-plugin-dts";
// Inject CSS from JavaScript
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env": {
      NODE_ENV: "production",
    },
  },
  plugins: [
    react(),
    svgr(),
    dts({ tsconfigPath: "./tsconfig.app.json" }),
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(path.join(__dirname, "src")),
    },
  },
  build: {
    // Leave minification up to applications.
    minify: false,
    cssMinify: false,
    sourcemap: true,
    // Reduce bloat from legacy polyfills.
    target: "esnext",
    lib: {
      entry: path.resolve(path.join(__dirname, "src", "index.ts")),
      name: "webui",
      formats: ["es"],
      fileName: "index",
      // fileName: (format) => `index.${format}.js`,
      // formats: ["cjs", "es", "system", "iife", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  base: "/",
});
