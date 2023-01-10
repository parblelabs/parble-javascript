import { ReadStream } from "fs";
export type RequestFunction = NodeRequest | BrowserRequest;

export type NodeRequest = (
  method: string,
  apiKey: string,
  apiUrl: string,
  path: string,
  extra_headers?: { [name: string]: string | number },
  // eslint-disable-next-line @typescript-eslint/ban-types
  extra_options?: Object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;

export type BrowserRequest = (
  method: string,
  apiKey: string,
  apiUrl: string,
  path: string,
  extra_headers?: { [name: string]: string | number },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;
