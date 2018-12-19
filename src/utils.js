const execSync = require('child_process').execSync;
const utils = require('fantasy-utility');
const fs = require('fs');
const chalk = require('chalk');

/**
 *
 * @param {string} command
 * @param {import('child_process').ExecSyncOptionsWithBufferEncoding} configs
 */
function exec(command, configs) {
  return execSync(
    command,
    Object.assign(
      {
        encoding: 'utf-8',
      },
      configs,
    ),
  );
}

function gitConfig() {
  let config = null;
  try {
    config = {
      name: exec('git config user.name')
        .toString()
        .trim(/\s/),
      email: exec('git config user.email')
        .toString()
        .trim(/\s/),
    };
  } catch (error) {
    console.error(chalk`{red Get git config error:}`, error);
  }

  return config;
}

function isEmptyDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
  }
  return files.length === 0;
}

module.exports = {
  exec,
  isEmptyDir,
  gitConfig,
  ufs: utils.fs,
};
