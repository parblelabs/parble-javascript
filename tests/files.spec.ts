import 'mocha';
import { assert } from 'chai';
import FormData from 'form-data';

import { Files, classifyInput } from '../src/files';
import { requestOptions } from '../src/helpers/requestOptions';

describe('Files class check', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof Files, 'function');
  });
  it('should have a correct property and methods', () => {
    const files = new Files('123test', '123test');
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

describe('Files POST function', () => {
  it('options get parse correctly', () => {
    const extraHeaders = {
      Accept: 'application/json',
      'Content-Type':
        'multipart/form-data; boundary=WebKitFormBoundary7MA4YWxkTrZu0gW',
    };
    const body: any = new FormData();
    const expectedOpts = {
      method: 'POST',
      headers: {
        'X-API-Key': '123test',
        ...extraHeaders,
      },
      body: body,
    };
    assert.deepEqual(
      requestOptions('POST', '123test', extraHeaders, body),
      expectedOpts
    );
  });

  it('return')
});
