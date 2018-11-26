const Mustache = require('mustache');
const { fs } = require('fantasy-utility');
const path = require('path');

const config = {
  extraConfig: `{}`,
  package: {
    name: 'hello'
  }
};

async function genPackage(name) {
  const view = {
    name
  };

  const files = await fs.readFiles(
    path.join(__dirname, '..', 'template', 'package.json')
  );

  const file = files[0];
  return Mustache.render(file.content, view);
}

module.exports = {
  genPackage
};
