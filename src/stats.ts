import axios from 'axios';

import { AutomationStats } from './types/statsAutomation';
import { UsageStats } from './types/statsUsage';

export class Stats {
  private apiPath = '/stats';
  constructor(private _apiKey: string, private _apiUrl: string) {}

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
  async get_usage(
    start_date: string,
    end_date: string
  ): Promise<AutomationStats | Error> {
    const getUsageUrl = `https://${this._apiUrl}${this.apiPath}/usage?start_date=${start_date}&end_date=${end_date}`;
    try {
      const response = await axios.get(getUsageUrl, this.passedHeaders);
      if (response.status !== 200) {
        throw new Error(
          `Error ${response.status} while getting the usage stats`
        );
      }
      return response.data;
    } catch (err: any) {
      console.log('Parble error: ', err);
      return err;
    }
  }

  /**
   * Gets the automation stats in certain time period
   * @param start_date Can be a: string i.ex.:(2020-01-20T00:00:00)
   * @param end_date Can be a: string i.ex.:(2020-01-20T23:59:59)
   */
  async get_automation(
    start_date: string,
    end_date: string
  ): Promise<UsageStats | Error> {
    const getAutomationUrl = `https://${this._apiUrl}${this.apiPath}/automation?start_date=${start_date}&end_date=${end_date}`;
    try {
      const response = await axios.get(getAutomationUrl, this.passedHeaders);
      if (response.status !== 200) {
        throw new Error(
          `Error ${response.status} while getting the automation stats`
        );
      }
      return response.data;
    } catch (err: any) {
      console.log('Parble error: ', err);
      return err;
    }
  }
}
