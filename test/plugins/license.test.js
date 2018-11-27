const { expect } = require('chai');
const _ = require('lodash');
const { applyOptions } = require('../../plugin/license/index');
const configs = require('../../src/config');

describe('license plugin test', () => {
  let config = _.cloneDeep(configs);

  const type = 'MIT';
  const name = 'Fantasy';

  applyOptions(config, { type, name });
  const _config = config.extraFiles.find(f => f.path === 'LICENSE');

  it('package license type should be MIT', () => {
    console.log(config);
    expect(config.pkgConfig.license).to.be.eq(type);
  });

  it('license name copyright owner should be Fantasy', () => {
    expect(_config.content).to.be.contain(name);
  });

  it('license year should be this year', () => {
    expect(_config.content).to.be.contain(new Date().getFullYear().toString());
  });
});
