import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/components/chat-ui/ChatPopUp.tsx",
      name: "ChatPopUp",
      formats: ["umd"],
    },
  },
  plugins: [
    react(),
    cssInjectedByJsPlugin({
      styleId: "yext-chat",
    }),
  ],
});
