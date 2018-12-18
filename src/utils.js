const execSync = require('child_process').execSync;
const utils = require('fantasy-utility');
const fs = require('fs');

function exec(command) {
  return execSync(command, { encoding: 'utf-8' })
    .toString()
    .trim(/\s/);
}

function gitConfig() {
  let config = null;
  try {
    config = {
      name: exec('git config user.name'),
      email: exec('git config user.email'),
    };
  } catch (error) {}

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
  isEmptyDir,
  gitConfig,
  ufs: utils.fs,
};
