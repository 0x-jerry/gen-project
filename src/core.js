const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const config = require('./config');
const Mustache = require('mustache');
const utils = require('./utils');
const shell = require('shelljs');
const { getConfigByLanguage } = require('./languageConfig');

config.author = utils.gitConfig();
config.project = path.parse(process.cwd()).name;

const pluginPath = path.join(__dirname, '..', 'plugin');

const pluginHelper = {
  config,
  addPlugin(name, options) {
    if (config.plugins[name]) {
      return console.warn('duplicate plugin', name);
    }

    config.plugins[name] = options;
  },
};

function render(filePath) {
  const p = path.isAbsolute(filePath)
    ? filePath
    : path.join(__dirname, '..', filePath);

  return new Promise((resolve, reject) => {
    fs.readFile(p, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(err);

      const hasMustache = /{{.+}}/.test(data);
      const content = hasMustache ? Mustache.render(data, config) : data;
      resolve(content);
    });
  });
}

async function installPlugins(plugins) {
  for (let i = 0; i < plugins.length; i++) {
    const p = path.join(pluginPath, plugins[i]);

    if (fs.existsSync(p)) {
      const plugin = require(p);
      await plugin.install(pluginHelper);
    }
  }
}

/**
 * @returns {{useTs: boolean, plugins: string[]}}
 */
async function prompts() {
  return await inquirer.prompt([
    {
      name: 'useTs',
      type: 'confirm',
      message: 'Use typescript?',
      default: false,
    },
    {
      name: 'plugins',
      type: 'checkbox',
      message: 'Select plugins',
      choices: fs.readdirSync(pluginPath).concat(Object.keys(config.plugins)),
    },
  ]);
}

/**
 *
 * @param {'ts'|'js'} lang
 */
function applyLanguageConfig(lang) {
  const langConfig = getConfigByLanguage(lang);

  config.packages.dependencies = config.packages.dependencies.concat(
    langConfig.packages.dependencies,
  );

  config.packages.devDependencies = config.packages.devDependencies.concat(
    langConfig.packages.devDependencies,
  );

  return langConfig.templates;
}

async function genProject(projectPath) {
  if (!projectPath) {
    return console.warn('incorrect path:', projectPath);
  }

  // choose plugins
  const answer = await prompts();

  // core template
  let templates = []
    .concat(config.templates)
    .concat(applyLanguageConfig(answer.useTs ? 'ts' : 'js'));

  const plugins = answer.plugins || [];
  await installPlugins(plugins);

  // plugin template
  plugins.forEach(key => {
    const tpls = config.plugins[key].templates;
    if (tpls && Array.isArray(tpls)) {
      templates = templates.concat(tpls);
    }
  });

  for (let i = 0, max = templates.length; i < max; i++) {
    const tpl = templates[i].tpl;
    const p = templates[i].path;
    const content = await render(tpl);
    //save file
    await utils.fs.saveFile(path.join(projectPath, p), content);
  }
}

async function test() {
  const tempPath = path.join(__dirname, '../temp');
  shell.exec(`rm -rf ${tempPath}`);

  await genProject(tempPath);

  // const packages = config.packages.dependencies;
  // if (packages.length) {
  //   shell.exec(`cd ${tempPath} && yarn add ${packages.join(' ')}`);
  // }

  // const devPackages = config.packages.devDependencies;
  // if (devPackages.length) {
  //   shell.exec(`cd ${tempPath} && yarn add ${devPackages.join(' ')} -D`);
  // }

  console.log(JSON.stringify(config, null, 2));
}

// test();

module.exports = genProject;
