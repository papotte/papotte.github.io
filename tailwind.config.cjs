/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';
import { createThemes } from 'tw-colors';

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './node_modules/flowbite/**/*.js'],
	safelist: ['w-1/5', 'w-2/5', 'w-3/5', 'w-4/5', 'w-5/5'],
	plugins: [
		require('flowbite/plugin'),
		require('tailwind-scrollbar')({ nocompatible: true }),
		plugin(({ addBase, theme }) => {
			addBase({
				h1: {
					fontSize: theme('fontSize.3xl'),
				},
				h2: {
					fontSize: theme('fontSize.2xl'),
				},
				h3: {
					fontSize: theme('fontSize.xl'),
				},
				p: {
					marginBottom: '1em',
				},
				body: {
					printColorAdjust: 'exact',
				},
			});
		}),
		plugin(({ matchComponents, theme }) => {
			matchComponents(
				{
					button: (value) => ({
						color: 'white',
						content: value,
						textAlign: 'center',
						padding: '0.625rem 1.25rem',
						borderRadius: '0.5rem',
						maxWidth: 'fit-content',
						backgroundColor: theme(`colors.${value}`),
						'&:hover': {
							backgroundColor: `hsl(var(--twc-${value}-800))`,
						},
						'&:focus': {
							'--tw-ring-color': `hsl(var(--twc-${value}-300))`,
							'--tw-ring-offset-shadow':
								'var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)',
							'--tw-ring-shadow':
								'var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color)',
							boxShadow: 'var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)',
							outline: 'none',
						},
					}),
				},
				{
					values: {
						primary: 'primary',
						secondary: 'secondary',
						accent: 'accent',
						tertiary: 'tertiary',
					},
				}
			);
		}),
		createThemes({
			light: {
				text: colors.slate[900],
				background: colors.sky[100],
				base: colors.white,
				primary: {
					...colors.sky,
					DEFAULT: colors.sky[600],
				},
				secondary: {
					...colors.cyan,
					DEFAULT: colors.cyan[600],
				},
				accent: {
					...colors.pink,
					DEFAULT: colors.pink[600],
				},
				tertiary: {
					...colors.slate,
					DEFAULT: colors.slate[600],
				},
			},
			dark: {
				text: 'hsl(189, 87%, 97%)',
				background: 'hsl(0, 0%, 0%)',
				base: colors.white,
				primary: {
					...colors.sky,
					DEFAULT: colors.sky[300],
				},
				secondary: {
					...colors.cyan,
					DEFAULT: colors.cyan[300],
				},
				accent: {
					...colors.pink,
					DEFAULT: colors.pink[300],
				},
				tertiary: {
					...colors.slate,
					DEFAULT: colors.slate[300],
				},
			},
		}),
	],
};
