/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				text: 'hsl(189, 87%, 97%)',
				background: 'hsl(0, 0%, 0%)',
				primary: colors.sky,
				secondary: colors.cyan,
				accent: colors.pink,
			},
		},
	},
	plugins: [],
};
