import axios, { AxiosResponse } from 'axios';

import { ApiKey } from './types/apikey';

export class Apikeys {
  constructor(private _apiKey: string, private _apiUrl: string) {}
  private apiPath = '/api-keys';
  private passedHeaders = {
    headers: {
      'X-API-Key': this._apiKey,
      Accept: 'application/json',
    },
  };

  /**
   * Create a new API key
   */
  async createOne(): Promise<ApiKey> {
    const createApikeyUrl = `https://${this._apiUrl}${this.apiPath}`;
    try {
      const response = await axios.post(createApikeyUrl, {}, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Error while posting the API key');
    }
  }

  /**
   * Gets the list of all the API keys
   */
  async getAll(): Promise<ApiKey[]> {
    const getApikeyUrl = `https://${this._apiUrl}${this.apiPath}`;
    try {
      const response = await axios.get(getApikeyUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Error while accessing the API keys list');
    }
  }

  /**
   * Retrieves an API key by its ID
   * @param apikeyId Unique identifier for the API key to retrieve
   */
  async getOne(apikeyId: string): Promise<ApiKey> {
    const getApikeyUrl = `https://${this._apiUrl}${this.apiPath}/${apikeyId}`;
    try {
      const response = await axios.get(getApikeyUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('API key not found');
    }
  }

  /**
   * Deletes an API key by its ID
   * @param apikeyId Unique identifier for the API key to retrieve
   */
  async deleteOne(apikeyId: string): Promise<AxiosResponse> {
    const deleteApikeyUrl = `https://${this._apiUrl}${this.apiPath}/${apikeyId}`;
    try {
      const response = await axios.delete(deleteApikeyUrl, this.passedHeaders);
      return response;
    } catch (err) {
      throw new Error('API key not found');
    }
  }
}
