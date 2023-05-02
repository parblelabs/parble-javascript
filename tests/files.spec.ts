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

describe('Files crud', () => {
  let apiKey: string, tenantUrl: string, files: Files;
  beforeEach(() => {
    apiKey = `${process.env.TEST_API_KEY}`;
    tenantUrl = `${process.env.TEST_URL}/${process.env.TEST_TENANT}`;
    files = new Files(apiKey, tenantUrl);
  });

  it('File success cycle POST > GET > DELETE function', async () => {
    // post file
    const postedFile = await files.post(
      './tests/resources/automated_test_file.pdf'
    );
    expect(postedFile.filename).to.deep.equal(mockFileOutput.filename);
    expect(postedFile.documents).to.deep.equal(mockFileOutput.documents);
    // get file
    const file = await files.get(postedFile.id);
    expect(file.filename).to.deep.equal(mockFileOutput.filename);
    expect(file.documents).to.deep.equal(mockFileOutput.documents);
    // delete file
    const deletion = await files.delete(postedFile.id);
    assert.equal(deletion.status, 204);
  });

  it('Files POST returns error when file is unreadable', async () => {
    try {
      await files.post('./tests/resources/appicon-terciary-shade.png');
      assert.fail('should have thrown an error');
    } catch (error) {
      assert.equal(error.message, 'Error while uploading the file');
    }
  });

  it('Files GET returns correct error when id is incorrect', async () => {
    try {
      await files.get('non-existent-file-id');
      assert.fail('should have thrown an error');
    } catch (error) {
      assert.equal(error.message, 'File not found');
    }
  });

  it('Files DELETE returns correct error when id is incorrect', async () => {
    try {
      await files.delete('non-existent-file-id');
      assert.fail('should have thrown an error');
    } catch (error) {
      assert.equal(error.message, 'File not found');
    }
  });
});
