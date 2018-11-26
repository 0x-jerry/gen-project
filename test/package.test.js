const { expect } = require('chai');
const { genPackage } = require('../src/core');

describe('package test', () => {
  it('name should eq test', () => {
    const name = 'test';
    const pkgConfig = genPackage({ name });

    expect(pkgConfig.name).to.be.eq(name);
  });
});
