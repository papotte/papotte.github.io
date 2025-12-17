import alpinejs from '@astrojs/alpinejs';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), alpinejs(), icon()],
	output: 'server',
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
		functionPerRoute: false,
		maxDuration: 30,
	}),
});
