export type RequestFunction = NodeRequest | BrowserRequest;

export type NodeRequest = (
  method: string,
  apiKey: string,
  apiUrl: string,
  path: string,
  extra_headers?: { [name: string]: string | number },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;

export type BrowserRequest = (
  method: string,
  apiKey: string,
  apiUrl: string,
  path: string,
  extra_headers?: { [name: string]: string | number }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;
