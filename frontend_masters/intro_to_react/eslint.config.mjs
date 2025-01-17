import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react"
import stylistic from "@stylistic/eslint-plugin"
import queryPlugin from "@tanstack/eslint-plugin-query"

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    // using spread... to expand the defaults to override them
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      }
    }
  },
  reactPlugin.configs.flat["jsx-runtime"],
  queryPlugin.configs["flat/recommended"],
  {
    files: ["**/*.js", "**/*.jsx"], // add jsx
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      "react/no-unescaped-entities": "off", // lets you write ' intead of &apos
      "react/prop-types": "off", // no one uses proptypes anymore?
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" }
      ]
    }
  },
  prettier,
];
