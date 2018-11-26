const Mustache = require('mustache');
const { fs } = require('fantasy-utility');
const path = require('path');

const config = {
  extraConfig: `{}`,
  package: {
    name: 'hello'
  }
}

fs.readFiles(path.join(__dirname, 'template')).then(files => {
  files.forEach(file => {
    const output = Mustache.render(file.content, config);
    fs.saveFile(path.join(__dirname, 'dist', file.name), output)
  })
})
