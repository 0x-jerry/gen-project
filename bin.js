const genProject = require('./src/core');
const utils = require('./src/utils');
const inquirer = require('inquirer');
const config = require('./src/config');
const path = require('path');
const { getPreset, savePreset } = require('./src/preset');
const program = require('commander');
const PKG = require('./package.json');

program.version(PKG.version).option('-s, --skip-install-pkg', 'Use for debug');

program.command('create [folder]').action(start);

program.parse(process.argv);

async function saveConfig() {
  /**
   * @type {{presetName:string}}
   */
  const answer = await inquirer.prompt([
    {
      name: 'save',
      message: 'Save to a preset?',
      type: 'confirm',
      default: false,
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
}

/**
 *
 * @param {string} projectPath
 */
function installPkg(projectPath) {
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
}

async function start(folder) {
  if (!folder) {
    const answer = await inquirer.prompt([
      {
        name: 'folder',
        message: 'Input project name',
        default: 'project',
      },
    ]);

    folder = answer.folder;
  }

  config.project = folder;

  const projectPath = path.join(__dirname, config.project);
  const preset = await getPreset();

  await genProject(projectPath, preset);

  if (!preset) {
    await saveConfig();
  }

  if (program.skipInstallPkg) {
    console.log(JSON.stringify(config, null, 2));
  } else {
    installPkg(projectPath);
  }
}
