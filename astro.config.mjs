import alpinejs from '@astrojs/alpinejs';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), alpinejs()],
	output: 'server',
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
});
