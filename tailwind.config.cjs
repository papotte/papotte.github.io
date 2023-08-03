/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import {createThemes} from 'tw-colors';

module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './node_modules/flowbite/**/*.js'],
    plugins: [
        require('flowbite/plugin'),
        require('tailwind-scrollbar')({nocompatible: true}),
        function ({addBase, theme}) {
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
                    marginBottom: '1em'
                }
            });
        },
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
            }
        })
    ],
};
