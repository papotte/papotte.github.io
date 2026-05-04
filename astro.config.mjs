import alpinejs from '@astrojs/alpinejs';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [alpinejs(), icon()],
	output: 'server',
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
		functionPerRoute: false,
		maxDuration: 30,
	}),
});
