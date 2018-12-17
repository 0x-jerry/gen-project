const config = require('./config');

const templates = {
  ts: [
    {
      path: 'src/index.ts',
      tpl: 'src/template/src/index.ts',
    },
    {
      path: 'tsconfig.json',
      tpl: 'src/template/tsconfig.json',
    },
    {
      path: 'tslint.json',
      tpl: 'src/template/tslint.json',
    },
  ],
  js: [
    {
      path: 'src/index.js',
      tpl: 'src/template/src/index.js',
    },
    {
      path: '.babelrc',
      tpl: 'src/template/.babelrc',
    },
    {
      path: '.eslintrc',
      tpl: 'src/template/.eslintrc',
    },
  ],
};

const packages = {
  ts: {
    dependencies: [],
    devDependencies: ['ts-lint', 'ts-loader', 'typescript'],
  },
  js: {
    dependencies: [],
    devDependencies: [
      'babel-eslint',
      'babel-loader',
      '@babel/core',
      '@babel/preset-env',
      'eslint',
    ],
  },
};

/**
 *
 * @param {'ts'|'js'} lang
 */
function getConfigByLanguage(lang) {
  switch (lang) {
    case 'ts':
      config.ts = true;
      break;
    case 'js':
      config.js = true;
      break;

    default:
      config.js = true;
      break;
  }

  return {
    templates: templates[lang] || [],
    packages: packages[lang] || {
      dependencies: [],
      devDependencies: [],
    },
  };
}

module.exports = { getConfigByLanguage };
