import FormData from 'form-data';

export type RequestFunction = NodeRequest | BrowserRequest;

export type NodeRequest = (
  method: string,
  apiKey: string,
  apiUrl: string,
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: string | FormData | File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  options?: Object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;

export type BrowserRequest = (
  method: string,
  apiKey: string,
  apiUrl: string,
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: string | FormData | File
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;
