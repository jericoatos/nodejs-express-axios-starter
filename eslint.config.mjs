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
      "no-undef": "off"
    },
    languageOptions: {
      globals: {
        console: "readonly"
      }
    }
  }
);
