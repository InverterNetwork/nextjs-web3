/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  ignorePatterns: ['node_modules'],
  rules: {
    'import/named': 'error',
  },
  root: true,
}
