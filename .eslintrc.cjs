module.exports = {
	plugins: ['prettier-doc', '@typescript-eslint', 'prettier'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended',
		'plugin:astro/recommended',
	],
	rules: {
		'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
		'@typescript-eslint/no-explicit-any': ['off'],
	},
	overrides: [
		{
			files: ['*.astro'],
			plugins: ['jsx-a11y'],
			extends: ['plugin:astro/recommended', 'plugin:astro/jsx-a11y-strict'],
			rules: {
				'astro/no-deprecated-astro-resolve': 'error',
				'astro/no-conflict-set-directives': 'error',
				'astro/no-unused-define-vars-in-style': 'error',
				'astro/no-set-html-directive': 'off',
				'astro/no-unused-css-selector': 'error',
				'astro/semi': ['error'],
			},
		},
		{
			files: ['*.cjs'],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
	],
};
