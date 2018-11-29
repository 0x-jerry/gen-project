const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const config = require('./config');
const Mustache = require('mustache');
const utils = require('./utils');

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
  }
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

async function applyPlugins(plugins) {
  for (let i = 0; i < plugins.length; i++) {
    const p = path.join(pluginPath, plugins[i]);

    if (fs.existsSync(p)) {
      const plugin = require(p);
      await plugin.install(pluginHelper);
    }
  }
}

async function genProject(prefixPath = '../temp') {
  // core template
  let templates = [].concat(config.templates);

  // choose plugins
  const answer = await inquirer.prompt([
    {
      name: 'plugins',
      type: 'checkbox',
      message: 'Select plugins',
      choices: fs.readdirSync(pluginPath).concat(Object.keys(config.plugins))
    }
  ]);

  const plugins = answer.plugins || [];

  await applyPlugins(plugins);

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
    await utils.fs.saveFile(path.join(__dirname, prefixPath, p), content);
  }
}

async function test() {
  const tempPath = path.join(__dirname, '../temp');
  require('child_process').execSync(`rm -rf ${tempPath}`, {
    encoding: 'utf-8'
  });
  await genProject();

  console.log(JSON.stringify(config, null, 2));
}

test();
