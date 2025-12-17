// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
//   pluginReact.configs.flat.recommended,
// ]);

import js from "@eslint/js";
import react from "eslint-plugin-react";
import { configs as tseslintConfigs } from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslintConfigs.recommended,
  {
    ignores: [
      "metro.config.js",
      ".lintstagedrc.js",
      "babel.config.js",
      "node_modules/**",
      "/.expo",
      "build",
      "bin",
      "expo-env.d.ts",
      "nativewind-env.d.ts",
      "ios",
      "android",
      "pnpm-lock.yaml",
      ".qodo",
      "tailwind.comfig.ts",
      
    ]
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: react
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      // 3. FIX REACT VERSION WARNING
      react: {
        version: "detect"
      }
    },
    rules: {
      // disable core rule so it doesn't only warn
      "no-unused-vars": "off",

      // 2. DISABLE REACT SCOPE (Fixes 'React must be in scope' errors)
      "react/react-in-jsx-scope": "off",

      // Optional: ensure unused vars is an error, not just a warning
      "@typescript-eslint/no-unused-vars": "error",

      // allow require()
      "@typescript-eslint/no-require-imports": "off",
      "no-console": "off",
    }
  }
];
