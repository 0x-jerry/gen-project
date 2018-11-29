const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
const pkg = require('./package.json');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: path.join(__dirname, 'src', 'index.{{#js}}j{{/js}}{{#ts}}t{{/ts}}s'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: pkg.name + '.js',
  },
  module: {
    rules: [
      {{#ts}}
      {
        test: /\.[tj]s?$/,
        exclude: [
          path.join(__dirname, 'node_modules')
        ],
        loader: 'ts-loader',
      },
      {{/ts}}
    ],
  },
  resolve: {
    extensions: [
      {{#js}}
      '.js',
      {{/js}}
      {{#ts}}
      '.js',
      '.ts',
      {{/ts}}
    ],
  },
};