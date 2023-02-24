import { Files } from './files.js';
import { _request } from './requests.js';

import { validateParams } from './helpers/validateParams.js';

export class parbleSDK {
  private _apiUrl: string;
  private _apiKey: string;

  files: Files;

  constructor(tenant: string, apiKey: string) {
    this._apiUrl = `api.test.parble.com/v1/${tenant}`;
    this._apiKey = apiKey;

    validateParams(this._apiKey, this._apiUrl);

    this.files = new Files(
      this._apiKey,
      this._apiUrl,
      _request
    );
  }
}
