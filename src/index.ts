import { Accounting } from './accounting';
import { Apikeys } from './apikeys';
import { Files } from './files';
import { Stats } from './stats';
import { validateParams } from './helpers/validateParams';

export class parbleSDK {
  private _apiUrl: string;
  private _apiKey: string;

  accounting: Accounting;
  apikeys: Apikeys;
  files: Files;
  stats: Stats;

  constructor(tenant: string, apiKey: string) {
    validateParams(apiKey, tenant);
    this._apiUrl = `api.parble.com/v1/${tenant}`;
    this._apiKey = apiKey;

    this.accounting = new Accounting(this._apiKey, this._apiUrl);
    this.apikeys = new Apikeys(this._apiKey, this._apiUrl);
    this.files = new Files(this._apiKey, this._apiUrl);
    this.stats = new Stats(this._apiKey, this._apiUrl);
  }
}
