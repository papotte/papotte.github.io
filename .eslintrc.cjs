module.exports = {
  plugins: ['prettier-doc', '@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:astro/recommended',
  ],
  rules: {
    'sort-imports': [
      'error',
      {
        allowSeparatedGroups: true,
        memberSyntaxSortOrder: ['multiple', 'single', 'all', 'none'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.astro'],
      // Allows Astro components to be parsed.
      parser: 'astro-eslint-parser',
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    {
      files: ['*.cjs'],
      rules: {
        'sort-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
