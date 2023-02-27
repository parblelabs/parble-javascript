import { promises as fspromises } from 'fs';
import FormData from 'form-data';
import axios from 'axios';

import { PredictedFileOutput } from './types/predictedFileOutput.js';

/* Classify the input type between pathlike or base64 */
export function classifyInput(input: string): string {
  const inputType = input.startsWith('data:') ? 'base64' : 'pathlike';
  return inputType;
}

export class Files {
  private apiPath = '/files';
  constructor(private _apiKey: string, private _apiUrl: string) {}

  /**
   * Posts a file to get the predictions
   * @param file Can be a:
   * - local or temp filepath such as /path/to/local/file.pdf;
   * - base64 image string such as data:@file/pdf;base64,....
   */
  async post(file: string): Promise<any> {
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
        const splitName = baseArray[0] ? baseArray[0].split(':@') : '';
        const nameContent = splitName[1] ? splitName[1].replace('/', '.') : '';
        const fileContent = String(baseArray[1]);
        const buffer64 = Buffer.from(fileContent, 'base64');
        formData.append('file', buffer64, { filename: nameContent });
        break;
    }

    const postDocUrl = `https://${this._apiUrl}${this.apiPath}`;
    try {
      const response = await axios.post(postDocUrl, formData, {
        headers: {
          'X-API-Key': this._apiKey,
          Accept: 'application/json',
          'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
        },
      });
      const result =
        response.status === 200
          ? response.data
          : {
              status: response.status,
              error: 'issue occurred while uploading',
            };

      return result;
    } catch (err: any) {
      console.log('Parble error: ', err.response.status);
      return {
        status: err.response.status,
        error: 'issue occurred while uploading',
      };
    }
  }

  /**
   * Retrieves prediction results for the provided fileId
   * @param fileId Unique identifier for the file results to retrieve
   */
  async get(fileId: string): Promise<PredictedFileOutput | any> {
    const getDocUrl = `https://${this._apiUrl}${this.apiPath}/${fileId}`;
    try {
      const response = await axios.get(getDocUrl, {
        headers: {
          'X-API-Key': this._apiKey,
        },
      });

      const result =
        response.status === 200
          ? response.data
          : {
              status: response.status,
              error: 'file not found',
            };

      return result;
    } catch (err: any) {
      console.log('Parble error: ', err.response.status);
      return {
        status: err.response.status,
        error: 'issue occurred while getting the file json',
      };
    }
  }
}
