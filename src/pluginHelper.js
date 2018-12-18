const config = require('./config');

/**
 * @type {Helper}
 */
const pluginHelper = {
  config,
  addPlugin(name, options) {
    if (config.plugins[name]) {
      return console.warn('duplicate plugin', name);
    }

    config.plugins[name] = options;
  },
  addPackages(dependencies, devDependencies) {
    config.packages.dependencies = config.packages.dependencies.concat(
      dependencies || [],
    );
    config.packages.devDependencies = config.packages.devDependencies.concat(
      devDependencies || [],
    );
  },
  addTemplate(projectPath, tplPath) {
    config.templates.push({
      path: projectPath,
      tpl: tplPath,
    });
  },
  addTemplates(templates) {
    config.templates = config.templates.concat(templates || []);
  },
};

module.exports = pluginHelper;
