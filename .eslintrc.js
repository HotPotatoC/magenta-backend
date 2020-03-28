module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    'no-console': ['off'],
    'arrow-body-style': ['off'],
    'linebreak-style': ['error', 'windows'],
    'consistent-return': ['off'],
    'no-underscore-dangle': ['off'],
    'comma-dangle': ['off'],
    'object-curly-spacing': ['off'],
    'arrow-parens': ['off'],
    'import/no-dynamic-require': ['off'],
    'global-require': ['off'],
    'func-names': ['off'],
    'space-before-function-paren': ['off'],
    'prefer-promise-reject-errors': ['off']
  }
};
