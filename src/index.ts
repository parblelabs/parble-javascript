import { Files } from './files';
import { _request } from './requests';

import { validateParams } from './helpers';

export class parbleSDK {
  private _apiUrl: string;
  private _apiKey: string;

  files: Files;

  constructor(tenant: string, apiKey: string) {
    this._apiUrl = `https://${tenant}.contract-t.fit/plg/v1`;
    this._apiKey = apiKey;

    validateParams(this._apiKey, this._apiUrl);

    this.files = new Files(
      this._apiKey,
      this._apiUrl,
      _request
    );
  }
}

export function post() {
  const message = 'Hello World from my example modern npm package!';
  return message;
}

export function get() {
  const message = 'Goodbye from my example modern npm package!';
  return message;
}

export default {
  post,
  get,
};
