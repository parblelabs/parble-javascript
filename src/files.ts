import { promises as fs } from 'fs';
import { Readable } from 'stream';
import FormData from 'form-data';

import { RequestFunction, PredictedFileOutput } from './types';

export class Files {
  constructor(
    private _apiKey: string,
    private _apiUrl: string,
    private _request: RequestFunction
  ) {}

  private apiPath = '/plg/v1/files';

  /**
   * Posts a file to get the predictions
   * @param file Can be a path to a file (string) or the file objects itself
   */
  async post(file: Readable | string): Promise<PredictedFileOutput> {
    /** Throw an error if the user a file that is not in the scope */
    if (
      !file ||
      (file && typeof file !== 'string' && typeof file !== 'object')
    ) {
      throw new Error(
        'Please provide either a binary file object or a path to a local file.'
      );
    }
    let extraOptions: any = {};
    const data: any = new FormData();

    /** When argument is a path */
    if (typeof file === 'string') {
      const filenameArray = file.split('/');
      const filename = filenameArray[filenameArray.length - 1];
      const fileItem = await fs.readFile(file);
      data.append('file', fileItem, { filename: filename });
      extraOptions = {
        formData: data,
      };
      /** When argument is filelike */
    } else {
      data.append('file', file, { filename: 'filename.pdf' });
      extraOptions = {
        formData: data,
      };
    }

    const response = await fetch(`https://${this._apiUrl}${this.apiPath}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'X-API-Key': `${this._apiKey}`,
        'Content-Type': `multipart/form-data; boundary=${data.getBoundary()}`,
      },
      body: data,
    });
    const result = await response.json();
    return result;
    // const extraHeaders = {
    //   'Content-Type': `multipart/form-data; boundary=${data.getBoundary()}`,
    // };

    // return this._request(
    //   'POST',
    //   this._apiUrl,
    //   this.apiPath,
    //   this._apiKey,
    //   extraHeaders,
    //   extraOptions
    // );
  }

  /**
   * Retrieves prediction results for the provided fileId
   * @param fileId Unique identifier for the file results to retrieve
   */
  async get(fileId: string): Promise<PredictedFileOutput> {
    return this._request(
      'GET',
      this._apiUrl,
      `${this.apiPath}/${fileId}`,
      this._apiKey
    );
  }
}
