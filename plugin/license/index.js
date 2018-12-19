const inquirer = require('inquirer');
const path = require('path');

const licenses = ['MIT'];

const _name = path.basename(__dirname);

const _config = {
  type: 'MIT',
  year: new Date().getFullYear(),
};

/**
 *
 * @param {Helper} helper
 */
function applyOptions(helper, { type, name }) {
  _config.type = type;
  _config.author = name;

  helper.addTemplate('LICENSE', `plugin/license/template/${type}`);
  helper.addPlugin(_name, _config);

  return _config;
}

async function install(helper) {
  const config = helper.config;

  const licensePrompt = [
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license',
      choices: licenses,
    },
    {
      type: 'input',
      name: 'name',
      default: config.author && config.author.name,
      message: 'Input license owner',
    },
  ];

  const answers = await inquirer.prompt(licensePrompt);

  applyOptions(helper, {
    type: answers.license,
    name: answers.name,
  });
}

module.exports = {
  install,
  applyOptions,
};
