import 'mocha';
import { assert, expect } from 'chai';

import { Accounting } from '../src/accounting';

describe('Accounting class check', () => {
  it('should be a function', () => {
    assert.strictEqual(typeof Accounting, 'function');
  });
  it('should have a correct property and methods', () => {
    const accounting = new Accounting('123test', '123test');
    assert.property(accounting, 'apiPath');
    assert.ok(accounting.balance);
    assert.strictEqual(typeof accounting.balance, 'function');
    assert.ok(accounting.articles);
    assert.strictEqual(typeof accounting.articles, 'function');
    assert.ok(accounting.checkout);
    assert.strictEqual(typeof accounting.checkout, 'function');
  });
});

describe('Accounting functionalities', () => {
  let apiKey: string, tenantUrl: string, accounting: Accounting;
  beforeEach(() => {
    apiKey = `${process.env.TEST_API_KEY}`;
    tenantUrl = `${process.env.TEST_URL}/${process.env.TEST_TENANT}`;
    accounting = new Accounting(apiKey, tenantUrl);
  });

  it('Accounting BALANCE answers correctly', async () => {
    const balance = await accounting.balance();
    expect(balance).to.be.an('object');
    expect(balance).to.have.property('balance').that.is.a('string');
    expect(balance).to.have.property('credit').that.is.a('string');
    expect(balance).to.have.property('usage').that.is.a('string');
  });

  it('Accounting ARTICLES answers correctly', async () => {
    const articles = await accounting.articles();
    expect(articles).to.be.an('object');
    expect(articles).to.have.property('unit_price').that.is.a('string');
  });

  it('Accounting CHECKOUT creates correct url on stripe and status is initiated as open', async () => {
    const articles = await accounting.checkout();
    expect(articles).to.be.an('object');
    expect(articles).to.have.property('url').that.is.a('string');
    expect(articles.url).to.include('checkout.stripe');
    assert.equal(articles.status, 'open');
  });
});
