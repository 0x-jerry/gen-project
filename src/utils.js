const execSync = require('child_process').execSync;
const { fs } = require('fantasy-utility');

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
      email: exec('git config user.email')
    };
  } catch (error) {}

  return config;
}

module.exports = {
  gitConfig,
  fs
};
