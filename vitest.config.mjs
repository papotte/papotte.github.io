/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const dir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(dir, './src'),
			'@content': resolve(dir, './src/pages/content'),
			'@components': resolve(dir, './src/components'),
			'@layouts': resolve(dir, './src/layouts'),
			'@pages': resolve(dir, './src/pages'),
			'@model': resolve(dir, './src/model'),
			'@styles': resolve(dir, './src/styles'),
			'@lib': resolve(dir, './src/lib'),
			'@tools': resolve(dir, './tools'),
		},
	},
	test: {
		globals: true,
		coverage: {
			include: ['src/!(model|styles)/'],
			reporter: ['text', 'json', 'json-summary', 'lcov'],
			thresholds: {
				lines: 20,
				branches: 15,
				functions: 20,
				statements: 20,
			},
			reportOnFailure: true,
		},
	},
});
