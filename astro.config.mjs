import alpinejs from '@astrojs/alpinejs';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), alpinejs(), mdx()],
	output: 'server',
	adapter: vercel({
		analytics: true,
	}),
});
