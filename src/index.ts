import { Files } from './files.js';
import { _request } from './helpers/requests.js';
import { validateParams } from './helpers/validateParams.js';

export class parbleSDK {
  private _apiUrl: string;
  private _apiKey: string;

  files: Files;

  constructor(tenant: string, apiKey: string) {
    validateParams(apiKey, tenant);
    this._apiUrl = `api.test.parble.com/v1/${tenant}`;
    this._apiKey = apiKey;


    this.files = new Files(
      this._apiKey,
      this._apiUrl,
      _request
    );
  }
}
