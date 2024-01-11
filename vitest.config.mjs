/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
	test: {
		globals: true,
		coverage: {
			reporter: ['text', 'json', 'html'],
		},
	},
});
