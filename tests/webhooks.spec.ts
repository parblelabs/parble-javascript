import 'mocha';
import { assert, expect } from 'chai';

import { Webhooks } from '../src/webhooks';
import { WebhookPayload } from '../src/types/webhook';

const whPayload: WebhookPayload = {
  events: ['document_predict'],
  target: 'https://example.com/webhook',
  headers: {
    'content-type': 'application/json',
  },
};

describe('Webhooks class check', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof Webhooks, 'function');
  });
  it('should have a correct property and methods', () => {
    const webhooks = new Webhooks('123test', '123test');
    assert.property(webhooks, 'apiPath');
    assert.ok(webhooks.postOne);
    assert.strictEqual(typeof webhooks.postOne, 'function');
    assert.ok(webhooks.getAll);
    assert.strictEqual(typeof webhooks.getAll, 'function');
    assert.ok(webhooks.getOne);
    assert.strictEqual(typeof webhooks.getOne, 'function');
    assert.ok(webhooks.deleteOne);
    assert.strictEqual(typeof webhooks.deleteOne, 'function');
  });
});

describe('Webhooks crud', () => {
  let apiKey: string, tenantUrl: string, webhooks: Webhooks;
  beforeEach(() => {
    apiKey = `${process.env.TEST_API_KEY}`;
    tenantUrl = `${process.env.TEST_URL}/${process.env.TEST_TENANT}`;
    webhooks = new Webhooks(apiKey, tenantUrl);
  });

  it('Webhooks success cycle POST > GETONE > GETALL > DELETE function', async () => {
    // post webhook
    const postedWebhook = await webhooks.postOne(whPayload);
    // get webhook
    const getOne = await webhooks.getOne(postedWebhook.id);
    expect(getOne.target).to.deep.equal(whPayload.target);
    expect(getOne.events).to.deep.equal(whPayload.events);
    // get all webhooks (should be at least 1)
    const getAll1 = await webhooks.getAll();
    assert.isAtLeast(getAll1.length, 1);
    const currentNumberOfWebhooks = getAll1.length;
    // delete webhook
    const deletion = await webhooks.deleteOne(postedWebhook.id);
    assert.equal(deletion.status, 204);
    // get all webhooks (should be 0)
    const getAll0 = await webhooks.getAll();
    expect(getAll0.length).to.deep.equal(currentNumberOfWebhooks - 1);
  });

  it('Webhooks POST bad payload error', async () => {
    try {
      await webhooks.postOne({} as WebhookPayload);
      assert.fail('should have thrown an error');
    } catch (error) {
      assert.equal(error.message, 'Error while posting the webhook');
    }
  });

  it('Webhooks GET bad id error', async () => {
    try {
      await webhooks.getOne('non-existent-webhook-id');
      assert.fail('should have thrown an error');
    } catch (error) {
      assert.equal(error.message, 'Webhook not found');
    }
  });

  it('Webhooks DELETE bad id error', async () => {
    try {
      await webhooks.deleteOne('non-existent-webhook-id');
      assert.fail('should have thrown an error');
    } catch (error) {
      assert.equal(error.message, 'Webhook not found');
    }
  });
});
