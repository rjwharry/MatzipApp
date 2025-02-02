import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: [
      'node_modules/',
      'build/*.js',
      'config/*.js',
      'coverage/*.js',
      'coverage/*',
      'jest/*.js',
      'jest*.js',
      '__tests__/*',
      '__tests__/*.js',
      'babel.config.js',
      'metro.config.js',
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
