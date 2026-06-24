import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import eslintConfigPrettier from "eslint-config-prettier";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import { reactRefresh } from "eslint-plugin-react-refresh";
import reactPlugin from "eslint-plugin-react";

export default defineConfig([
  globalIgnores([
    "dist",
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.storybook/**",
    "!**/.storybook/**"
  ]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      js,
      "unused-imports": unusedImports,
      noRelativeImportPaths,
      react: reactPlugin,
    },
    extends: [
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"],
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
      {
        files: ["**/src/**/*.{test,stories}.{ts,tsx}"],
        rules: {
          "max-len": "off"
        }
      }
    ],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    rules: {
      quotes: ["warn", "double", { avoidEscape: true }],
      "react/display-name": "off",
      "no-duplicate-imports": "error",
      "@typescript-eslint/no-namespace": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "none",
          vars: "all",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_"
        }
      ],
      "react/require-default-props": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": "off",
      "@typescript-eslint/ban-ts-comment": "warn",
      "no-shadow": "off",
      "import/extensions": "off",
      "import/no-extraneous-dependencies": "off",
      "no-underscore-dangle": "off",
      "unused-imports/no-unused-imports": "error",
      "react/jsx-max-props-per-line": ["error", { maximum: 4 }],
      "react/no-unstable-nested-components": "warn",
      "import/no-relative-parent-imports": "off",
      "@typescript-eslint/no-require-imports": "off",
      "max-len": [
        "error",
        {
          ignoreComments: true,
          code: 125
        }
      ],
      "jsx-a11y/no-static-element-interactions": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "no-param-reassign": "off",
      "no-undef": "off",
      "react/no-array-index-key": "off",
      "arrow-body-style": "off"
    }
  }
]);