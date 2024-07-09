import { defineConfig } from 'eslint-define-config';

export default defineConfig([
  {
    files: ['*.js', '**/*.js', '*.mjs', '**/*.mjs', '*.cjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        module: 'readonly',
        __dirname: 'readonly',
        require: 'readonly',
        process: 'readonly',
      },
    },
    linterOptions: {
      env: {
        node: true,
      },
    },
    extends: 'airbnb-base',
    rules: {
      // Tus reglas personalizadas aquí
    },
  },
]);
