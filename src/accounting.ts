import axios from 'axios';

import { Balance, Article, PaymentLink } from './types/accounting';

export class Accounting {
  constructor(private _apiKey: string, private _apiUrl: string) {}
  private apiPath = '/accounting';
  private passedHeaders = {
    headers: {
      'X-API-Key': this._apiKey,
      Accept: 'application/json',
    },
  };

  /**
   * Checks the balance of the account
   */
  async balance(): Promise<Balance> {
    const checkBalanceUrl = `https://${this._apiUrl}${this.apiPath}/balance`;
    try {
      const response = await axios.get(checkBalanceUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Error while getting the balance');
    }
  }

  /**
   * Checks available articles for adding balance
   */
  async articles(): Promise<Article> {
    const checkArticlesUrl = `https://${this._apiUrl}${this.apiPath}/pricing`;
    try {
      const response = await axios.get(checkArticlesUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Error while getting the available articles');
    }
  }

  /**
   * Creates a checkout session for adding balance to the organization
   */
  async checkout(): Promise<PaymentLink> {
    const paymentCreationUrl = `https://${this._apiUrl}${this.apiPath}/checkout`;
    try {
      const response = await axios.post(
        paymentCreationUrl,
        {},
        this.passedHeaders
      );
      return response.data;
    } catch (err) {
      throw new Error('Error while getting the available articles');
    }
  }
}
