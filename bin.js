const genProject = require('./src/core');
const utils = require('./src/utils');
const inquirer = require('inquirer');
const config = require('./src/config');
const path = require('path');

const argv = process.argv.slice(2);

const binConfig = {
  folder: argv[0],
  skipInstallPkg: false,
};

checkOptions(argv.slice(1));

/**
 *
 * @param {string} arg
 */
function isOption(arg) {
  return arg.startsWith('--');
}

/**
 * @param {string[]} argv
 */
function checkOptions(argv) {
  argv.forEach(arg => {
    if (isOption(arg) && arg === '--skip-install-package') {
      binConfig.skipInstallPkg = true;
    }
  });
}

async function start() {
  if (!binConfig.folder) {
    const answer = await inquirer.prompt([
      {
        name: 'folder',
        message: 'Input project name',
        default: 'project',
      },
    ]);

    binConfig.folder = answer.folder;
  }
  config.project = binConfig.folder;

  const projectPath = path.join(__dirname, config.project);

  await genProject(projectPath);

  if (!binConfig.skipInstallPkg) {
    const packages = config.packages.dependencies;
    if (packages.length) {
      utils.exec(`cd ${projectPath} && yarn add ${packages.join(' ')}`, {
        stdio: 'inherit',
      });
    }
    const devPackages = config.packages.devDependencies;
    if (devPackages.length) {
      utils.exec(`cd ${projectPath} && yarn add ${devPackages.join(' ')} -D`, {
        stdio: 'inherit',
      });
    }
  } else {
    console.log(JSON.stringify(config, null, 2));
  }
}

start();
