/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		globals: true,
		coverage: {
			reporter: ['text', 'json', 'json-summary', 'lcov'],
			thresholds: {
				lines: 20,
				branches: 20,
				functions: 20,
				statements: 20,
			},
			reportOnFailure: true,
		},
	},
});
