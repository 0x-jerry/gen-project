const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const config = require('./config');
const Mustache = require('mustache');
const utils = require('./utils');

config.author = utils.gitConfig();
config.project = path.parse(process.cwd()).name;

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

async function applyPlugins() {
  const pluginPath = path.join(__dirname, '..', 'plugin');
  const files = fs.readdirSync(pluginPath);

  for (let i = 0; i < files.length; i++) {
    const plugin = require(path.join(pluginPath, files[i]));
    await plugin.install(config);
  }
}

async function genProject(prefixPath = '../temp') {
  // core template
  let templates = [].concat(config.templates);

  // plugin template
  Object.keys(config.plugins).forEach(key => {
    const tpls = config.plugins[key].templates;
    if (tpls && Array.isArray(tpls)) {
      templates = templates.concat(tpls);
    }
  });

  for (let i = 0, max = templates.length; i < max; i++) {
    const tpl = templates[i].tpl;
    const p = templates[i].path;
    const content = await render(tpl);
    //save files
    await utils.fs.saveFile(path.join(__dirname, prefixPath, p), content);
  }
}

async function test() {
  await applyPlugins();
  await genProject();
  console.log(JSON.stringify(config, null, 2));
}

test();
