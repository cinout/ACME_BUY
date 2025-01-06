import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // enables JSX and React Fast Refresh
import eslint from "vite-plugin-eslint"; // Vite does not run ESLint by default during development. Install this to enforce linting during dev and build

// Doc: https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"], // files to lint
      emitWarning: true, // Shows warnings in terminal
      emitError: true, // Shows errors in terminal
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  css: {
    postcss: "./postcss.config.js", // pointing to the postcss config file (optional, because Vite automatically detects postcss.config.js)
    devSourcemap: true, // enable sourcemap in development
  },
});
