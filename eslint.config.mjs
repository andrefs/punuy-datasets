import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    files: ["*.ts", "*.tsx"], // If you want it to apply only to TypeScript files
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {},
    env: {
      es2021: true,
    },
    settings: {},
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
  },
];
