module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['off'],
    'no-new': ['off'],
    'no-bitwise': ['off'],
    'import/prefer-default-export': ['off'],
    'consistent-return': ['off'],
    'no-alert': ['off'],
    'no-restricted-globals': [
      'error', {
        name: 'console',
      }],
  },
};
