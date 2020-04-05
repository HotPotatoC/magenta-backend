module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
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
    'import/no-unresolved': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
