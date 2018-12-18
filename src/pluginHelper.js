const config = require('./config');

const pluginHelper = {
  config,
  /**
   *
   * @param {string} name
   * @param {JSON} options
   */
  addPlugin(name, options) {
    if (config.plugins[name]) {
      return console.warn('duplicate plugin', name);
    }

    config.plugins[name] = options;
  },
  /**
   *
   * @param {string[]} dependencies
   * @param {string[]} devDependencies
   */
  addPackages(dependencies, devDependencies) {
    config.packages.dependencies = config.packages.dependencies.concat(
      dependencies || [],
    );
    config.packages.devDependencies = config.packages.devDependencies.concat(
      devDependencies || [],
    );
  },
  /**
   *
   * @param {string} projectPath
   * @param {string} tplPath
   */
  addTemplate(projectPath, tplPath) {
    config.templates.push({
      path: projectPath,
      tpl: tplPath,
    });
  },
  /**
   *
   * @param {ITemplate[]} templates
   */
  addTemplates(templates) {
    config.templates = config.templates.concat(templates || []);
  },
};

module.exports = pluginHelper;
