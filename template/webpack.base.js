const Path = require('path');
const merge = require('webpack-merge');

const baseConfig = {
  entry: Path.join(__dirname, 'index.js')
};

module.exports = merge(baseConfig, {{extraConfig}})