const genProject = require('./src/core');
const utils = require('./src/utils');
const inquirer = require('inquirer');
const config = require('./src/config');
const path = require('path');
const { getPreset, savePreset } = require('./src/preset');

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
  const preset = await getPreset();

  await genProject(projectPath, preset);

  /**
   * @type {{presetName:string}}
   */
  const answer = await inquirer.prompt([
    {
      name: 'save',
      message: 'Save to a preset?',
      type: 'confirm',
    },
    {
      name: 'presetName',
      message: 'Input preset name',
      when(answer) {
        return answer.save;
      },
    },
  ]);

  if (answer.presetName) {
    savePreset(answer.presetName, config);
  }

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
