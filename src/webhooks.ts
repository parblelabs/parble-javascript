import axios from 'axios';

export class Webhooks {
  constructor(private _apiKey: string, private _apiUrl: string) {}
  private apiPath = '/webhooks';
  private passedHeaders = {
    headers: {
      'X-API-Key': this._apiKey,
    },
  };

  /**
   * Gets the usage stats in certain time period
   * @param start_date Can be a: string i.ex.:(2020-01-20T00:00:00)
   * @param end_date Can be a: string i.ex.:(2020-01-20T23:59:59)
   */
  async post(events: [string], target: string, headers: {}): Promise<any> {
    const postWebhookUrl = `https://${this._apiUrl}${this.apiPath}`;
    try {
      const response = await axios.post(postWebhookUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Error while posting the api key');
    }
  }

  /**
   * Gets the usage stats in certain time period
   * @param start_date Can be a: string i.ex.:(2020-01-20T00:00:00)
   * @param end_date Can be a: string i.ex.:(2020-01-20T23:59:59)
   */
  async getAll(): Promise<any> {
    const getWebhookUrl = `https://${this._apiUrl}${this.apiPath}`;
    try {
      const response = await axios.get(getWebhookUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Error while accessing the api keys list');
    }
  }

  /**
   * Gets the usage stats in certain time period
   * @param start_date Can be a: string i.ex.:(2020-01-20T00:00:00)
   * @param end_date Can be a: string i.ex.:(2020-01-20T23:59:59)
   */
  async getOne(id: string): Promise<any> {
    const getWebhookUrl = `https://${this._apiUrl}${this.apiPath}/${id}`;
    try {
      const response = await axios.post(getWebhookUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Api key not found');
    }
  }

  /**
   * Gets the usage stats in certain time period
   * @param start_date Can be a: string i.ex.:(2020-01-20T00:00:00)
   * @param end_date Can be a: string i.ex.:(2020-01-20T23:59:59)
   */
  async deleteOne(id: string): Promise<any> {
    const deleteWebhookUrl = `https://${this._apiUrl}${this.apiPath}/${id}`;
    try {
      const response = await axios.post(deleteWebhookUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Api key not found');
    }
  }
}
