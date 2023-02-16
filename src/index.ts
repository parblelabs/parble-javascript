import { Files } from './files';
import { _request } from './requests';

import { validateParams } from './helpers';

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
