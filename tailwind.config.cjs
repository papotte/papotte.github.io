/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                text: 'hsl(189, 87%, 97%)',
                background: 'hsl(0, 0%, 0%)',
                primary: {
                    ...colors.sky,
                    DEFAULT: colors.sky[600]
                },
                secondary: {
                    ...colors.cyan,
                    DEFAULT: colors.cyan[600]
                },
                accent: {
                    ...colors.pink,
                    DEFAULT: colors.pink[600]
                },
                tertiary: {
                    ...colors.slate,
                    DEFAULT: colors.slate[600]
                }
            },
        },
    },
    plugins: [
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
                }

            });
        },
    ],
};
