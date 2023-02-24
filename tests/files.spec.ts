import 'mocha';
import { assert } from 'chai';

import { Files, classifyInput } from '../src/files.js';
import { _request } from '../src/helpers/requests.js';

describe('Files class check', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof Files, 'function');
  });
  it('should have a correct property and methods', () => {
    const files = new Files('', '', _request);
    assert.property(files, 'apiPath');
    assert.ok(files.post);
    assert.strictEqual(typeof files.post, 'function');
    assert.ok(files.get);
    assert.strictEqual(typeof files.get, 'function');
  });
});

describe('Files input classification', () => {
  it('goes with pathlike by default', () => {
    assert.strictEqual(classifyInput('/path/to/file'), 'pathlike');
  });
  it('goes with base64 if needed', () => {
    assert.strictEqual(
      classifyInput('data:@file/pdf;base64,JVBERi...'),
      'base64'
    );
  });
});

describe('Files post function', () => {
    if('throws if the argument is not a string') {
        const files = new Files('', '', _request);
    }
})