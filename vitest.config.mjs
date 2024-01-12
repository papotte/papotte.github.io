/// <reference types="vitest" />
/// <reference types="vitest/globals" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		globals: true,
		coverage: {
			include: ['src/!(model)/'],
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
