import 'mocha';
import { assert } from 'chai';

import { parbleSDK } from '../src/index';

describe('NPM Package', () => {
  it('should be an object', () => {
    assert.isObject(parbleSDK);
  });
});
