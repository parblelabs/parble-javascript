import 'mocha';
import { assert, expect } from 'chai';
import nock from 'nock';

import { Files, classifyInput } from '../src/files';

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
  it('returns correct file json when id is correct', async () => {
    const apiKey = `${process.env.TEST_API_KEY}`;
    const tenantUrl = `${process.env.TEST_URL}/${process.env.TEST_TENANT}`;
    const files = new Files(apiKey, tenantUrl);
    // Intercept the request
    const scope = nock(`https://${tenantUrl}/files`)
      .post(``)
      .reply(200, { message: 'Mocked response' });
    // Make the request
    const response = await files.post('./tests/bundle_eml.pdf');
    // Assert that the request was made once
    expect(scope.isDone()).to.be.true;

    console.log('RESP', response);
    // Assert that the response matches the mocked response
    expect(response).to.deep.equal({ message: 'Mocked POST response' });
  });
});

describe('Files GET function', () => {
  it('returns correct file json when id is correct', async () => {
    const apiKey = `${process.env.TEST_API_KEY}`;
    const tenantUrl = `${process.env.TEST_URL}/${process.env.TEST_TENANT}`;
    const files = new Files(apiKey, tenantUrl);
    // Intercept the request
    const scope = nock(`https://${tenantUrl}/files/${process.env.TEST_FILE}`)
      .get(``)
      .reply(200, { message: 'Mocked response' });
    // Make the request
    const response = await files.get(`${process.env.TEST_FILE}`);
    // Assert that the request was made once
    expect(scope.isDone()).to.be.true;

    console.log('RESP', response);
    // Assert that the response matches the mocked response
    expect(response).to.deep.equal({ message: 'Mocked GET response' });
  });
});
