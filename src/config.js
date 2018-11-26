const pkgConfig = {
  name: '',
  version: '0.1.0',
  script: {},
  dependencies: {},
  devDependencies: {}
};

const webpackConfig = {
  entry: '',
  mode: 'development',
  output: {},
  module: {
    rules: {}
  },
  resolve: {},
  plugins: [], // ['new Plugin()'] => plugins: [ new plugin()]
  devtools: '',
  devServer: {}
};

const config = {
  pkgConfig,
  webpackConfig,
  extraFiles: [
    // {
    //   path: '.eslintrc',
    //   content: ''
    // }
  ],
  preset: {
    target: 'lib | browser | node',
    language: 'js | ts'
  },
  // eslint: true,
  // editorConfig: true,
  // test: {
  //   mocha: true
  // },
  // license: 'MIT',
  plugins: [
    // { // sort with name
    //   name: 'plugin-name',
    //   options: {}
    // }
  ]
};

module.exports = config;
