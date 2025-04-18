/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc"; // enables JSX and React Fast Refresh
import eslint from "vite-plugin-eslint"; // Vite does not run ESLint by default during development. Install this to enforce linting during dev and build
import checker from "vite-plugin-checker";

// Doc: https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    checker({
      typescript: true, // e.g. use TypeScript check
    }),
    eslint({
      include: [
        "src/**/*.js",
        "src/**/*.jsx",
        "src/**/*.ts",
        "src/**/*.tsx",
        "tests_unit/**/*.tsx",
        "tests_unit/**/*.ts",
        "tests_e2e/**/*.tsx",
        "tests_e2e/**/*.ts",
      ], // files to lint
      emitWarning: true, // Shows warnings in terminal
      emitError: true, // Shows errors in terminal
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
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
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.js",
  },
});
