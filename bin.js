const genProject = require('./src/core');
const shell = require('shelljs');
const inquirer = require('inquirer');
const config = require('./src/config');
const path = require('path');

const projectFolder = process.argv.slice(2)[0];

async function start() {
  if (!projectFolder) {
    const answer = await inquirer.prompt([
      {
        name: 'folder',
        message: 'Input project name',
        default: 'project'
      }
    ]);
    config.project = answer.folder;
  }

  const tempPath = path.join(__dirname, 'project');

  await genProject();

  const packages = config.packages.dependencies;
  if (packages.length) {
    shell.exec(`cd ${tempPath} && yarn add ${packages.join(' ')}`);
  }
  const devPackages = config.packages.devDependencies;
  if (devPackages.length) {
    shell.exec(`cd ${tempPath} && yarn add ${devPackages.join(' ')} -D`);
  }
}

start();
