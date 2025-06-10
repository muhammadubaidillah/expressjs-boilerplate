const prettierConf = require('./.prettierrc')

module.exports = {
  root: true,
  env: {
    browser: true,
    jest: true,
    jquery: true,
  },
  extends: ['airbnb', 'prettier'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'prettier/prettier': ['error', prettierConf],
  },
  plugins: ['prettier'],
}
