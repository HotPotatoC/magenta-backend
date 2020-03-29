module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    allowImportExportEverywhere: true,
  },
  rules: {
    'prefer-promise-reject-errors': 'off',
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
  },
};
