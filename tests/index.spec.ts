import 'mocha';
import { assert } from 'chai';

import { post, get } from '../src/index';
import npmPackage from '../src/index';

describe('NPM Package', () => {
  it('should be an object', () => {
    assert.isObject(npmPackage);
  });

  it('should have a post property', () => {
    assert.property(npmPackage, 'post');
  });
});

describe('Hello World Function', () => {
  it('should be a function', () => {
    assert.isFunction(post);
  });

  it('should return the hello world message', () => {
    const expected = 'Hello World from my example modern npm package!';
    const actual = post();
    assert.equal(actual, expected);
  });
});

describe('get Function', () => {
  it('should be a function', () => {
    assert.isFunction(get);
  });

  it('should return the get message', () => {
    const expected = 'Goodbye from my example modern npm package!';
    const actual = get();
    assert.equal(actual, expected);
  });
});
