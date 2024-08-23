// eslint.config.js
import { ESLint } from 'eslint';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': await import('@typescript-eslint/eslint-plugin'),
      prettier: await import('eslint-plugin-prettier'),
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
  },
];
