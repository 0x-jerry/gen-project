const { expect } = require('chai');
const { genPackage } = require('../src/core');

describe('package test', () => {
  it('should be eq', async () => {
    const name = 'test';
    const template = await genPackage(name);

    const pkg = JSON.parse(template);
    expect(pkg.name).to.be.eq(name);
  });
});
