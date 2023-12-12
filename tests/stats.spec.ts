import 'mocha';
import { assert, expect } from 'chai';

import { Stats } from '../src/stats';

describe('Stats class check', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof Stats, 'function');
  });
  it('should have a correct property and methods', () => {
    const stats = new Stats('123test', '123test');
    assert.property(stats, 'apiPath');
    assert.property(stats, 'passedHeaders');
    assert.ok(stats.usage);
    assert.strictEqual(typeof stats.usage, 'function');
    assert.ok(stats.automation);
    assert.strictEqual(typeof stats.automation, 'function');
  });
});

describe('Stats crud', () => {
  let apiKey: string, tenantUrl: string, stats: Stats;
  beforeEach(() => {
    apiKey = `${process.env.TEST_API_KEY}`;
    tenantUrl = `${process.env.TEST_URL}/${process.env.TEST_TENANT}`;
    stats = new Stats(apiKey, tenantUrl);
  });

  it('Stats USAGE returns correct counts json when correct', async () => {
    const usage = await stats.usage('2020-01-20T00:00:00', '2024-01-20T23:59:59');
    expect(usage).to.be.an('object');
    expect(usage).to.have.property('files').that.is.a('number');
    expect(usage).to.have.property('documents').that.is.a('number');
    expect(usage).to.have.property('pages').that.is.a('number');
  });
  it('Stats USAGE returns empty counts when end is before start', async () => {
    const usage = await stats.usage('2024-01-20T23:59:59', '2020-01-20T00:00:00');
    expect(usage).to.deep.equal({
      files: 0,
      documents: 0,
      pages: 0,
    });
  });
  it('Stats USAGE returns error 400 when range is wrongly defined', async () => {
    try {
      await stats.usage('bad-range-start', 'bad-range-end');
      assert.fail('should have thrown an error');
    } catch (error) {
      assert.equal(error.message, 'Invalid range of dates');
    }
  });

  it('Stats AUTOMATION  returns correct counts json when correct', async () => {
    const automation = await stats.automation('2020-01-20T00:00:00', '2024-01-20T23:59:59');
    expect(automation).to.be.an('object');
    expect(automation).to.have.property('files').that.is.an('object');
    expect(automation).to.have.property('documents').that.is.an('object');
    expect(automation).to.have.property('fields').that.is.an('object');
  });
  it('Stats AUTOMATION  returns empty counts when end is before start', async () => {
    const automation = await stats.automation('2024-01-20T23:59:59', '2020-01-20T00:00:00');
    expect(automation).to.deep.equal({
      files: {
        rate: 0,
        stp: 0,
        total: 0,
      },
      documents: {
        rate: 0,
        stp: 0,
        total: 0,
      },
      fields: {
        rate: 0,
        stp: 0,
        total: 0,
      },
    });
  });
  it('Stats AUTOMATION  returns error 400 when range is wrongly defined', async () => {
    try {
      await stats.automation('bad-range-start', 'bad-range-end');
      assert.fail('should have thrown an error');
    } catch (error) {
      assert.equal(error.message, 'Invalid range of dates');
    }
  });
});
