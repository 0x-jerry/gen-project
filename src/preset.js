const inquirer = require('inquirer');
const os = require('os');
const path = require('path');
const fs = require('fs');
const utils = require('fantasy-utility');

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

async function getPreset() {
  /**
   * @type {{preset: string}}
   */
  const answer = await inquirer.prompt([
    {
      name: 'preset',
      type: 'list',
      message: 'Choose a preset',
      choices: Object.keys(presets)
        .concat(Object.keys(extraPresets))
        .concat('custom'),
    },
  ]);

  return presets[answer.preset] || extraPresets[answer.preset] || null;
}

/**
 * @param {string} name
 * @param {IConfig} config
 */
function savePreset(name, config) {
  extraPresets = extraPresets || {};
  extraPresets[name] = config;
  utils.fs
    .saveFile(rcPath, JSON.stringify(extraPresets, null, 2))
    .then(() => {
      console.log('saved');
    })
    .catch(e => config.log('save error', e));
}

module.exports = {
  getPreset,
  savePreset,
};
