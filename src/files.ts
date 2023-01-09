import { promises as fs } from 'fs';
import FormData from 'form-data';

import { RequestFunction, PredictedFileOutput } from './types';

export class Files {
  constructor(
    private _apiKey: string,
    private _apiUrl: string,
    private _request: RequestFunction
  ) {}

  private apiPath = '/files';

  /**
   * Posts a file to get the predictions
   * @param file Can be a path to a file (string) or the file objects itself
   */
  async post(file: File | string): Promise<PredictedFileOutput> {
    /** Throw an error if the user a file that is not in the scope */
    if (file && typeof file !== undefined) {
      throw new Error(
        'Please provide either a binary file object or a path to a local file.'
      );
    }
    let payload: FormData | File;
    const extraHeaders: { [name: string]: string | number } = {};

    if (typeof file === 'string') {
      const fileItem = await fs.readFile(file);
      const filenameArray = file.split('/');
      const filename = filenameArray[filenameArray.length - 1];
      payload = new FormData();
      payload.append('file', fileItem, { filename: filename });
      extraHeaders[
        'Content-Type'
      ] = `multipart/form-data; boundary=${payload.getBoundary()}`;
    } else {
      payload = file;
    }

    return this._request(
      'POST',
      this._apiKey,
      this._apiUrl,
      this.apiPath,
      payload,
      extraHeaders
    );
  }

  /**
   * Retrieves prediction results for the provided fileId
   * @param fileId Unique identifier for the file results to retrieve
   */
  async get(fileId: string): Promise<PredictedFileOutput> {
    return this._request(
      'GET',
      this._apiKey,
      this._apiUrl,
      `${this.apiPath}/${fileId}`
    );
  }
}
