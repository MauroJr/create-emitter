'use strict';

const expect = require('chai').expect;

const CreateRegex = require('../src/route-parser');

describe('Route Parser', () => {
  describe('create a regex', () => {
    expect(CreateRegex('users/:action=(insert|update)/:id')).to.be.a('array');
  });
});
