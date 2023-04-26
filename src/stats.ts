import axios from 'axios';

import { AutomationStats } from './types/statsAutomation';
import { UsageStats } from './types/statsUsage';

export class Stats {
  constructor(private _apiKey: string, private _apiUrl: string) {}
  private apiPath = '/stats';
  private passedHeaders = {
    headers: {
      'X-API-Key': this._apiKey,
      Accept: 'application/json',
    },
  };

  /**
   * Gets the usage stats in certain time period
   * @param start_date Can be a: string i.ex.:(2020-01-20T00:00:00)
   * @param end_date Can be a: string i.ex.:(2020-01-20T23:59:59)
   */
  async usage(start_date: string, end_date: string): Promise<AutomationStats> {
    const getUsageUrl = `https://${this._apiUrl}${this.apiPath}/usage?start_date=${start_date}&end_date=${end_date}`;
    try {
      const response = await axios.get(getUsageUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Invalid range of dates');
    }
  }

  /**
   * Gets the automation stats in certain time period
   * @param start_date Can be a: string i.ex.:(2020-01-20T00:00:00)
   * @param end_date Can be a: string i.ex.:(2020-01-20T23:59:59)
   */
  async automation(start_date: string, end_date: string): Promise<UsageStats> {
    const getAutomationUrl = `https://${this._apiUrl}${this.apiPath}/automation?start_date=${start_date}&end_date=${end_date}`;
    try {
      const response = await axios.get(getAutomationUrl, this.passedHeaders);
      return response.data;
    } catch (err) {
      throw new Error('Invalid range of dates');
    }
  }
}
