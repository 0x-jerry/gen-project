const config = {
  project: '',
  author: {
    name: '',
    email: ''
  },
  packages: {
    dependencies: [],
    devDependencies: [
      'clean-webpack-plugin',
      'copy-webpack-plugin',
      'html-webpack-plugin',
      'webpack',
      'webpack-cli',
      'webpack-merge',
    ]
  },
  js: false,
  ts: true,
  browser: true,
  node: false,
  library: false,
  plugins: {},
  templates: [
    {
      path: 'package.json',
      tpl: 'src/template/package.json'
    },
    {
      path: 'webpack.base.js',
      tpl: 'src/template/webpack.base.js'
    },
    {
      path: 'webpack.dev.js',
      tpl: 'src/template/webpack.dev.js'
    },
    {
      path: 'webpack.prod.js',
      tpl: 'src/template/webpack.prod.js'
    }
  ]
};

module.exports = config;
