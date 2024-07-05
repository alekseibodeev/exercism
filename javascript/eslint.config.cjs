const globals = require('globals');
const pluginJs = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');
const pluginJest = require('eslint-plugin-jest');

module.exports = [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginJest.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    ignores: ['**/*.config.*', '/cleanup.js', '**/*.spec.js'],
  },
];
