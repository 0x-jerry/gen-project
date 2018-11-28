const inquirer = require('inquirer');
const path = require('path');

const licenses = ['MIT'];

const _name = 'license';

const _config = {
  type: 'MIT',
  year: new Date().getFullYear(),
  templates: []
};

function applyOptions(config, { type, name }) {
  _config.type = type;
  _config.author = name || config.author.name;
  _config.templates.push({
    path: 'LICENSE',
    tpl: path.join(__dirname, 'template', type)
  });

  config.plugins[_name] = _config;

  return _config;
}

async function install(config) {
  const licensePrompt = [
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license',
      choices: licenses
    },
    {
      type: 'input',
      name: 'name',
      // default: 'Fantasy',
      message: 'Input your name'
    }
  ];

  const answers = await inquirer.prompt(licensePrompt);

  applyOptions(config, {
    type: answers.license,
    name: answers.name
  });
}

module.exports = {
  install,
  applyOptions
};
