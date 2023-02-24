import 'mocha';
import { assert } from 'chai';

import { parbleSDK } from '../src/index';

describe('NPM Package', () => {
  const parble = new parbleSDK("asd", "asd")
  it('should be an object', () => {
    assert.isObject(parble);
  });
  it('should have a files property', () => {
    assert.property(parble, 'files');
  });
});
