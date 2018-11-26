const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const config = require('./config');

function genPackage(options = {}) {
  if (options.name) config.pkgConfig.name = options.name;

  return config.pkgConfig;
}

function genWebpack(options = {}) {
  return config.webpackConfig;
}

async function applyPlugins() {
  const pluginPath = path.join(__dirname, '../plugin');

  const files = fs.readdirSync(pluginPath);
  files.sort((a, b) => (a > b ? 1 : -1));

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const plugin = require(path.join(pluginPath, file));

    if (typeof plugin.install === 'function') {
      await plugin.install(config);
    } else {
      console.warn('plugin', file, 'no install function');
    }
  }
}

module.exports = {
  applyPlugins,
  genPackage,
  genWebpack
};
