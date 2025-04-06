import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config({
  ignores: ["dist", "node_modules", "build", "vite.config.js"],
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: "latest", // ESLint will understand and properly lint the latest JavaScript syntax and features.
    globals: { ...globals.browser }, // to allow browser specific global variables like window, and document
    parserOptions: {
      project: "./tsconfig.json",
      sourceType: "module",
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    react,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-console": "warn",
    "no-var": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
    "@typescript-eslint/no-unsafe-assignment": "warn", // too many false positives
    "@typescript-eslint/no-unsafe-argument": "warn", // too many false positives
    "@typescript-eslint/no-unsafe-member-access": "warn", // too many false positives
    "@typescript-eslint/no-unsafe-call": "warn", // too many false positives
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "prefer-const": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-explicit-any": "error",
  },
});

// "eslintConfig": {
//     "root": true,
//     "env": {
//       "browser": true,
//       "node": true,
//       "es2021": true
//     },
//     "extends": [
//       "react-app",
//       "react-app/jest",
//       "eslint:recommended",
//       "plugin:react/recommended",
//       "plugin:react/jsx-runtime",
//       "plugin:@typescript-eslint/recommended",
//       "plugin:react-hooks/recommended"
//     ],
//     "rules": {
//       "react/prop-types": "off"
//     },

//     "parser": "@typescript-eslint/parser",

//     "plugins": [
//       "react",
//       "jsx-a11y",
//       "react-hooks",
//       "@typescript-eslint"
//     ]
//   },
