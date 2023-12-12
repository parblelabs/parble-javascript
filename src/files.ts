import { promises as fspromises } from 'fs';
import FormData from 'form-data';
import axios, { AxiosResponse } from 'axios';

import { PredictedFileOutput } from './types/predictedFileOutput';

/* Classify the input type between pathlike or base64 */
export function classifyInput(input: string): string {
  const inputType = input.startsWith('data:') ? 'base64' : 'pathlike';
  return inputType;
}

export class Files {
  constructor(private _apiKey: string, private _apiUrl: string) {}
  private apiPath = '/files';
  private passedHeaders = {
    headers: {
      'X-API-Key': this._apiKey,
      'Accept': 'application/json',
    },
  };

  /**
   * Posts a file to get the predictions
   * @param file Can be a:
   * - local or temp filepath such as /path/to/local/file.pdf;
   * - base64 image string such as data:@file/pdf;base64,....
   * @param inbox_id Unique identifier for the inbox to which the file belongs
   * @returns {PredictedFileOutput} The prediction results
   */
  async post(file: string, inbox_id: string): Promise<PredictedFileOutput> {
    /** Throw an error if the user submits a file that is not in the scope */
    if (!file || typeof file !== 'string') {
      throw new Error('Please provide the file in a valid string');
    }
    /** Throw an error if the user submits without indicating the inbox_id */
    if (typeof inbox_id !== 'string') {
      throw new Error('Please provide the correct inbox_id');
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
    if (inbox_id) {
      formData.append('inbox_id', inbox_id);
    }

    const postDocUrl = `https://${this._apiUrl}${this.apiPath}`;
    try {
      const response = await axios.post(postDocUrl, formData, {
        headers: {
          ...this.passedHeaders.headers,
          'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
        },
      });
      if (response.status !== 200) {
        throw new Error('Error while uploading the file');
      }
      return response.data;
    } catch (err) {
      console.log('err', err);
      throw new Error('Error while uploading the file');
    }
  }

  /**
   * Retrieves prediction results for the provided fileId
   * @param fileId Unique identifier for the file results to retrieve
   * @returns {PredictedFileOutput} The prediction results
   */
  async get(fileId: string): Promise<PredictedFileOutput> {
    const getDocUrl = `https://${this._apiUrl}${this.apiPath}/${fileId}`;
    try {
      const response = await axios.get(getDocUrl, this.passedHeaders);
      if (response.status !== 200) {
        throw new Error('File not found');
      }
      return response.data;
    } catch (err) {
      throw new Error('File not found');
    }
  }

  /**
   * Deletes permanently the prediction results for the provided fileId
   * @param fileId Unique identifier for the file results to delete
   * @returns {AxiosResponse} The response from the API
   */
  async delete(fileId: string): Promise<AxiosResponse> {
    const getDocUrl = `https://${this._apiUrl}${this.apiPath}/${fileId}`;
    try {
      const response = await axios.delete(getDocUrl, this.passedHeaders);
      if (response.status !== 204) {
        throw new Error('File not found');
      }
      return response;
    } catch (err) {
      throw new Error('File not found');
    }
  }
}
