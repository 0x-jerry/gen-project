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
  plugins: {
    'editor-config': {
      templates: [
        {
          path: '.editorconfig',
          tpl: 'template/.editorconfig'
        }
      ]
    }
  },
  templates: [
    {
      path: 'package.json',
      tpl: 'template/package.json'
    },
    {
      path: 'webpack.base.js',
      tpl: 'template/webpack.base.js'
    },
    {
      path: 'webpack.dev.js',
      tpl: 'template/webpack.dev.js'
    },
    {
      path: 'webpack.prod.js',
      tpl: 'template/webpack.prod.js'
    }
  ]
};

module.exports = config;
