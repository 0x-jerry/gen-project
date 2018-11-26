const { expect } = require('chai');
const _ = require('lodash');
const { applyConfig } = require('../../plugin/license/index');
const configs = require('../../src/config');
const fs = require('fs');
const path = require('path');

describe('license plugin test', () => {
  let config = null;

  beforeEach(() => {
    config = _.cloneDeep(configs);
  });

  it('choose MIT license', async () => {
    const type = 'MIT';

    applyConfig(config, { type: 'MIT', name: 'Fantasy' });
    const pkgConfig = config.pkgConfig;

    expect(pkgConfig.license).to.be.eq(type);
    const _config = config.extraFiles.find(f => f.path === 'LICENSE');
    expect(_config.content).to.be.contain('Fantasy');
  });
});
