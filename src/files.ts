import { promises as fspromises } from 'fs';
import FormData from 'form-data';

import { RequestFunction, PredictedFileOutput } from './types';

/* Classify the input type between pathlike or base64 */
function classifyInput(input: string): string {
  const inputType = input.startsWith('data:') ? 'base64' : 'pathlike';
  return inputType;
}

export class Files {
  constructor(
    private _apiKey: string,
    private _apiUrl: string,
    private _request: RequestFunction
  ) {}

  private apiPath = '/files';

  /**
   * Posts a file to get the predictions
   * @param file Can be a:
   * - local or temp filepath such as /path/to/local/file.pdf;
   * - base64 image string such as data:@file/pdf;base64,....
   */
  async post(file: string): Promise<any> {
    try {
      /** Throw an error if the user submits a file that is not in the scope */
      if (!file || typeof file !== 'string') {
        throw new Error('Please provide the file in a valid string');
      }

      const formData: any = new FormData();
      const classifiedInput = classifyInput(file);
      switch (classifiedInput) {
        case 'pathlike':
          const filenameArray = file.split('/');
          const filename = filenameArray[filenameArray.length - 1];
          const fileLocal = await fspromises.readFile(file);
          formData.append('file', fileLocal, { filename: filename });
          break;
        case 'base64':
          const baseArray = file.split(';base64,');
          const nameContent = baseArray[0].split(':@')[1].replace('/', '.');
          const fileContent = String(baseArray[1]);
          const buffer64 = Buffer.from(fileContent, 'base64');
          console.log('NAME: ', nameContent);
          formData.append('file', buffer64, { filename: nameContent });
          break;
      }

      const extraHeaders = {
        Accept: 'application/json',
        'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
      };
      const body = formData;

      return this._request(
        'POST',
        this._apiUrl,
        this.apiPath,
        this._apiKey,
        extraHeaders,
        body
      );
    } catch (err) {
      console.log('error: ', err);
    }
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
