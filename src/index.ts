import { Files } from './files.js';
import { validateParams } from './helpers/validateParams.js';

export class parbleSDK {
  private _apiUrl: string;
  private _apiKey: string;

  files: Files;

  constructor(tenant: string, apiKey: string) {
    validateParams(apiKey, tenant);
    this._apiUrl = `api.parble.com/v1/${tenant}`;
    this._apiKey = apiKey;


    this.files = new Files(
      this._apiKey,
      this._apiUrl
    );
  }
}
