import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// vite-plugin-css-injected-by-js
// import "webui/dist/style.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
