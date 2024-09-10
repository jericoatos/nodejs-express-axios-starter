// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["dist/", "node_modules/"],
    rules: {
      // Disable the rule that disallows console statements
      "no-console": "off",
      // Ensure console is defined
      "no-undef": "off",
      // Disable the require-yield rule if not needed
      "require-yield": "off",
      // Ensure no var-requires rule is enforced
      "@typescript-eslint/no-var-requires": "error",
      // Additional TypeScript specific rules
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/ban-ts-comment": "warn"
    },
    languageOptions: {
      globals: {
        console: "readonly"
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    }
  }
);
