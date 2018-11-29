const config = {
  project: '',
  author: {
    name: '',
    email: ''
  },
  packages: {
    depend: [],
    dev: ['webpack', 'webpack-cli']
  },
  js: true,
  ts: false,
  browser: true,
  node: false,
  isModule: false,
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
