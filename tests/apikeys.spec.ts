import 'mocha';
import { assert, expect } from 'chai';

import { Apikeys } from '../src/apikeys';

describe('Apikeys class check', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof Apikeys, 'function');
  });
  it('should have a correct property and methods', () => {
    const apikeys = new Apikeys('123test', '123test');
    assert.property(apikeys, 'apiPath');
    assert.ok(apikeys.createOne);
    assert.strictEqual(typeof apikeys.createOne, 'function');
    assert.ok(apikeys.getAll);
    assert.strictEqual(typeof apikeys.getAll, 'function');
    assert.ok(apikeys.getOne);
    assert.strictEqual(typeof apikeys.getOne, 'function');
    assert.ok(apikeys.deleteOne);
    assert.strictEqual(typeof apikeys.deleteOne, 'function');
  });
});

describe('Apikeys crud', () => {
  let apiKey: string, tenantUrl: string, apikeys: Apikeys;
  beforeEach(() => {
    apiKey = `${process.env.TEST_API_KEY}`;
    tenantUrl = `${process.env.TEST_URL}/${process.env.TEST_TENANT}`;
    apikeys = new Apikeys(apiKey, tenantUrl);
  });

  it('Apikeys success cycle POST > GETONE > GETALL > DELETE function', async () => {
    // post API key
    const postedApikey = await apikeys.createOne();
    // get API key
    const getOne = await apikeys.getOne(postedApikey.id);
    expect(getOne.active).to.deep.equal(true);
    assert.strictEqual(typeof getOne.token, 'string');
    // get all API keys (should be at least 2)
    const getAll1 = await apikeys.getAll();
    assert.isAtLeast(getAll1.length, 2);
    const currentNumberOfApikeys = getAll1.length;
    // delete API key
    const deletion = await apikeys.deleteOne(postedApikey.id);
    assert.equal(deletion.status, 204);
    // get all API keys (should be 1)
    const getAll0 = await apikeys.getAll();
    expect(getAll0.length).to.deep.equal(currentNumberOfApikeys - 1);
  });

  it('Apikeys GET bad id error', async () => {
    try {
      await apikeys.getOne('non-existent-apikey-id');
      assert.fail('should have thrown an error');
    } catch (error) {
      assert.equal(error.message, 'API key not found');
    }
  });

  it('Apikeys DELETE bad id error', async () => {
    try {
      await apikeys.deleteOne('non-existent-apikey-id');
      assert.fail('should have thrown an error');
    } catch (error) {
      assert.equal(error.message, 'API key not found');
    }
  });
});
