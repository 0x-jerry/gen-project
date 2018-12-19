const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const fs = require('fs');
const utils = require('fantasy-utility');
const chalk = require('chalk');

/**
 * @type {{[name:string]: IConfig}}
 */
const presets = require('./preset.json');
/**
 * @type {{[name:string]: IConfig}}
 */
let extraPresets = {};

const rcPath = path.join(os.homedir(), '.projrc');

if (fs.existsSync(rcPath)) {
  const data = utils.fs.readFile.sync(rcPath) || '{}';
  extraPresets = JSON.parse(data);
}

function formatPresets(presets) {
  const options = [];

  for (const key in presets) {
    if (presets.hasOwnProperty(key)) {
      const preset = presets[key];
      let keys = [];
      if (preset.browser) keys.push('webpack');
      if (preset.ts) keys.push('ts');
      if (preset.js) keys.push('js');
      if (preset.node) keys.push('node');
      if (preset.library) keys.push('library');
      keys = keys.concat(Object.keys(preset.plugins));

      options.push(`${key} - (${keys.join(' ')})`);
    }
  }

  return options;
}

async function getPreset() {
  /**
   * @type {{preset: string}}
   */
  const answer = await inquirer.prompt([
    {
      name: 'preset',
      type: 'list',
      message: 'Choose a preset',
      choices: formatPresets(presets)
        .concat(formatPresets(extraPresets))
        .concat('custom'),
    },
  ]);

  const preset = answer.preset.match(/\w+/)[0] || '';

  return presets[preset] || extraPresets[preset] || null;
}

/**
 * @param {string} name
 * @param {IConfig} config
 */
function savePreset(name, config) {
  if (name in presets || name in extraPresets) {
    return console.log(
      chalk`{red save failed! [${name}] has exists in preset!}`,
    );
  }

  extraPresets[name] = config;
  utils.fs
    .saveFile(rcPath, JSON.stringify(extraPresets, null, 2))
    .then(() => {
      console.log(chalk`{green preset [${name}] save successful}`);
    })
    .catch(e => config.log(chalk`{red preset [${name}] save failed}`, e));
}

module.exports = {
  getPreset,
  savePreset,
};
