import 'mocha';
import { assert } from 'chai';

import { parbleSDK } from '../src/index';
import { validateParams } from '../src/helpers/validateParams';

describe('NPM Package entry check', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof parbleSDK, 'function');
  });
  it('should have a correct properties', () => {
    const parble = new parbleSDK('123test', '123test');
    assert.property(parble, '_apiUrl');
    assert.property(parble, '_apiKey');
    assert.property(parble, 'files');
  });
});

describe('SDK params validation works as expected', () => {
  it('throws if no API key provided', () => {
    assert.throws(() => {
      validateParams('', '123test');
    }, /API key is required/);
  });
  it('throws if no Tenant key provided', () => {
    assert.throws(() => {
      validateParams('123test', '');
    }, /Tenant not provided/);
  });
});
