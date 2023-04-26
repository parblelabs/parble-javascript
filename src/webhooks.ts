import axios, { AxiosResponse } from 'axios';

import { Webhook, WebhookPayload } from './types/webhook';

export class Webhooks {
  constructor(private _apiKey: string, private _apiUrl: string) {}
  private apiPath = '/webhooks';
  private passedHeaders = {
    headers: {
      'X-API-Key': this._apiKey,
      Accept: 'application/json',
    },
  };

  /**
   * Create a webhook that will trigger on certain event(s) and post to the specified target URL
   * @param events An array of strings representing the trigger events
   * @param target The URI of the webhook endpoint, starting with http:// or https://
   * @param headers Optional headers to include in the webhook
   */
  async postOne(webhook: WebhookPayload): Promise<Webhook> {
    const postWebhookUrl = `https://${this._apiUrl}${this.apiPath}`;
    try {
      const response = await axios.post(
        postWebhookUrl,
        webhook,
        this.passedHeaders
      );
      return response.data;
    } catch (err) {
      throw new Error('Error while posting the webhook');
    }
  }

  /**
   * Gets the list of all webhooks
   */
  async getAll(): Promise<Webhook[]> {
    const getWebhookUrl = `https://${this._apiUrl}${this.apiPath}`;
    try {
      const response = await axios.get(getWebhookUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Error while accessing the webhooks list');
    }
  }

  /**
   * Retrieves a webhook by its ID
   * @param webhookId Unique identifier for the webhook to retrieve
   */
  async getOne(webhookId: string): Promise<Webhook> {
    const getWebhookUrl = `https://${this._apiUrl}${this.apiPath}/${webhookId}`;
    try {
      const response = await axios.get(getWebhookUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Webhook not found');
    }
  }

  /**
   * Deletes a webhook by its ID
   * @param webhookId Unique identifier for the webhook to retrieve
   */
  async deleteOne(webhookId: string): Promise<AxiosResponse> {
    const deleteWebhookUrl = `https://${this._apiUrl}${this.apiPath}/${webhookId}`;
    try {
      const response = await axios.delete(deleteWebhookUrl, this.passedHeaders);
      return response;
    } catch (err) {
      throw new Error('Webhook not found');
    }
  }
}
