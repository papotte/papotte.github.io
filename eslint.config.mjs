import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import prettierDoc from 'eslint-plugin-prettier-doc';

import astroParser from 'astro-eslint-parser';

export default [
	js.configs.recommended,
	{
		plugins: {
			'prettier-doc': prettierDoc,
			'@typescript-eslint': typescriptEslint,
			prettier,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': ['off'],
			'prettier/prettier': 'error',
			'no-undef': 'off', // TypeScript handles this
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		rules: {
			...typescriptEslint.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': ['off'],
		},
	},
	{
		files: ['**/*.astro'],
		plugins: {
			'jsx-a11y': jsxA11y,
			astro,
		},
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: tsParser,
				extraFileExtensions: ['.astro'],
			},
		},
		rules: {
			...astro.configs.recommended.rules,
			...astro.configs['jsx-a11y-strict'].rules,
			'astro/no-deprecated-astro-resolve': 'error',
			'astro/no-conflict-set-directives': 'error',
			'astro/no-unused-define-vars-in-style': 'error',
			'astro/no-set-html-directive': 'off',
			'astro/no-unused-css-selector': 'error',
			'astro/semi': ['error'],
		},
	},
	{
		files: ['**/*.cjs'],
		rules: {
			'@typescript-eslint/no-var-requires': 'off',
		},
	},
];
