const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');

const licenses = ['MIT'];

const _config = {
  name: 'license-plugin',
  options: {
    type: 'MIT',
    name: 'null'
  }
};

function applyConfig(config, options) {
  _config.options = Object.assign(_config.options, options);

  config.pkgConfig.license = _config.options.type;
  config.plugins.push(_config);

  const content = fs.readFileSync(
    path.join(__dirname, 'template', options.type),
    {
      encoding: 'utf-8'
    }
  );

  config.extraFiles.push({
    path: 'LICENSE',
    content: Mustache.render(content, _config.options)
  });

  return _config;
}

function install(config) {
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
      message: 'Input your name'
    }
  ];

  inquirer.prompt(licensePrompt).then(answers => {
    applyConfig(config, {
      type: answers.license,
      name: answers.name
    });
  });
}

module.exports = {
  install,
  applyConfig
};
