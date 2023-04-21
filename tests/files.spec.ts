import 'mocha';
import { assert, expect } from 'chai';

import { Files, classifyInput } from '../src/files';
import { data as mockFileOutput } from './resources/automated_test_file_mock';

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
  let apiKey: string, tenantUrl: string, files: Files;
  beforeEach(() => {
    apiKey = `${process.env.TEST_API_KEY}`;
    tenantUrl = `${process.env.TEST_URL}/${process.env.TEST_TENANT}`;
    files = new Files(apiKey, tenantUrl);
  });

  it('returns correct file json when filepath is provided', async () => {
    this.timeout(20000); // set a timeout of 20 seconds for upload files
    const res = await files.post('./tests/resources/automated_test_file.pdf');
    expect(res.filename).to.deep.equal(mockFileOutput.filename);
    expect(res.documents).to.deep.equal(mockFileOutput.documents);
  });
  it('returns error when file is unreadable', async () => {
    const res = await files.post('./tests/resources/appicon-terciary-shade.png');
    expect(res).to.deep.equal({
      status: 415,
      error: 'issue occurred while uploading',
    });
  });
});

describe('Files GET function', () => {
  let apiKey: string, tenantUrl: string, files: Files;
  beforeEach(() => {
    apiKey = `${process.env.TEST_API_KEY}`;
    tenantUrl = `${process.env.TEST_URL}/${process.env.TEST_TENANT}`;
    files = new Files(apiKey, tenantUrl);
  });

  it('returns correct file json when id is correct', async () => {
    const res = await files.get(`${process.env.TEST_FILE}`);
    expect(res.filename).to.deep.equal(mockFileOutput.filename);
    expect(res.documents).to.deep.equal(mockFileOutput.documents);
  });
  it('returns correct error when id is incorrect', async () => {
    const res = await files.get('123test');
    expect(res).to.deep.equal({
      status: 404,
      error: 'issue occurred while getting the file json',
    });
  });
});
