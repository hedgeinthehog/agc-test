module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['perfectionist'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        fixStyle: 'inline-type-imports',
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'alphabetical',
        order: 'asc',
        ignoreCase: true,
        internalPattern: ['~/**'],
        newlinesBetween: 'always',
        maxLineLength: undefined,
        groups: [
          'react',
          'type',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'object',
          'unknown',
        ],
        customGroups: {
          value: {
            react: ['react', 'react-*', 'rxjs', 'rxjs*', 'observable*'],
          },
          type: {
            react: ['react', 'react-*', 'rxjs', 'rxjs*', 'observable*'],
          },
        },
        environment: 'node',
      },
    ],
  },
}
