const globals = require('globals');
const pluginJs = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginJest = require('eslint-plugin-jest');

module.exports = [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintPluginJest,
  eslintConfigPrettier,
];
