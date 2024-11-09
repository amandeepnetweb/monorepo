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
    "process.env.NODE_ENV": '"production"',
  },
  // For marking your library as SSR compatible, so you dont have to use
  // ssr: {
  //   noExternal: ["@amandeepnetweb/webui"], // Ensure your library is bundled for SSR
  // },
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
    ssr: true,
    copyPublicDir: false,
    // Leave minification up to applications.
    minify: true,
    cssMinify: true,
    sourcemap: false,
    // Reduce bloat from legacy polyfills.
    target: "esnext",
    lib: {
      entry: path.resolve(path.join(__dirname, "src", "index.ts")),
      name: "@amandeepnetweb/webui",
      formats: ["es"],
      fileName: "index",
      // formats: ["es", "cjs"], // Enables compatibility for both ES and CommonJS
      // fileName: (format) => `index.${format}.js`,
      // fileName: (format) => `index.${format}.js`,
      // formats: ["cjs", "es", "system", "iife", "umd"],
    },
    rollupOptions: {
      // output: {
      //   preserveModules: true,
      // },
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
