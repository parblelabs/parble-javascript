import { Files } from './files';
import { Stats } from './stats';
import { Webhooks } from './webhooks';
import { validateParams } from './helpers/validateParams';

export class parbleSDK {
  private _apiUrl: string;
  private _apiKey: string;

  files: Files;
  stats: Stats;
  webhooks: Webhooks;

  constructor(tenant: string, apiKey: string) {
    validateParams(apiKey, tenant);
    this._apiUrl = `api.parble.com/v1/${tenant}`;
    this._apiKey = apiKey;

    this.files = new Files(this._apiKey, this._apiUrl);
    this.stats = new Stats(this._apiKey, this._apiUrl);
    this.webhooks = new Webhooks(this._apiKey, this._apiUrl);
  }
}
