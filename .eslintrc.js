module.exports = {
  extends: [
    '@calblueprint/eslint-config-react',
    'plugin:jsdoc/recommended-typescript-error',
  ],
  plugins: ['jsdoc'],
  ignorePatterns: ['src/app/testing/page.tsx'],
  rules: {
    // ... other ESLint rules ...
    'no-warning-comments': 'error',
  },
};
