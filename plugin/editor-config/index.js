const path = require('path');
const _name = path.basename(__dirname);

/**
 *
 * @param {Helper} helper
 */
function install(helper) {
  helper.addPlugin(_name, {});

  helper.addTemplate(
    '.editorconfig',
    'plugin/editor-config/template/.editorconfig',
  );
}

module.exports = {
  install,
};
