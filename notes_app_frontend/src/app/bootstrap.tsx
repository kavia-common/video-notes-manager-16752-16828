import ReactDOM from "react-dom/client";
import App from "./App";

const mount = () => {
  const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : undefined;
  const doc: any = g?.document;
  if (!doc) return;
  const container = doc.getElementById("root");
  if (!container) return;
  const root = ReactDOM.createRoot(container as any);
  root.render(<App />);
};

(() => {
  const g: any = typeof globalThis !== "undefined" ? (globalThis as any) : undefined;
  const win: any = g?.window;
  const doc: any = g?.document;
  if (!win || !doc) return;
  if (doc.readyState !== "loading") {
    mount();
  } else {
    win.addEventListener("DOMContentLoaded", mount);
  }
})();
