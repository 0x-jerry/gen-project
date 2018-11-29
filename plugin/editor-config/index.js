const path = require('path');

const _name = path.basename(__dirname);

const _config = {
  templates: [
    {
      path: '.editorconfig',
      tpl: path.join(__dirname, 'template/.editorconfig')
    }
  ]
};

function install(helper) {
  helper.addPlugin(_name, _config);
}

module.exports = {
  install
};
