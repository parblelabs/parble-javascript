import FormData from 'form-data';
import https, { RequestOptions } from 'https';

const _requestOptions = (
  apiKey: string,
  apiUrl: string,
  path: string,
  method: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: string | FormData | File,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override_options?: any
): RequestOptions => {
  const additionalHeaders: { [name: string]: string | number } = {};

  const options = {
    host: apiUrl,
    path,
    method,
    headers: {
      Accept: 'application/json',
      'X-API-Key': `token ${apiKey}`,
      ...additionalHeaders,
    },
    body: payload,
  };
  let headers = options.headers;
  if (override_options && override_options.headers) {
    headers = { ...headers, ...override_options.headers };
  }

  return { ...options, ...override_options, ...{ headers } };
};

export function _request<T>(
  method: string,
  apiKey: string,
  apiURL: string,
  path: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: string | FormData | File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  options?: Object
): Promise<T> {
  const requestOptions = _requestOptions(
    apiKey,
    apiURL,
    path,
    method,
    payload,
    options
  );
  return new Promise((resolve, reject) => {
    try {
      const httpRequest = https.request(requestOptions, (parbleRes) => {
        let parbleResContent = '';

        parbleRes.on('data', (chunk) => {
          parbleResContent += chunk;
        });

        parbleRes.on('end', () => {
          let parbleResponse;
          try {
            parbleResponse = JSON.parse(parbleResContent);
          } catch (err) {
            parbleResponse = { error: parbleResContent };
          }

          if (parbleRes.statusCode && parbleRes.statusCode >= 400) {
            reject(`Parble: ${parbleResponse.error}: ${parbleResponse.reason}`);
          }

          if (parbleResponse.error) {
            reject(`Parble: ${parbleResContent}`);
          }
          resolve(parbleResponse);
        });

        parbleRes.on('error', (err) => {
          reject(`Parble: ${err}`);
        });
      });

      httpRequest.on('error', (err) => {
        reject(`Parble: ${err}`);
      });

      httpRequest.end();
    } catch (err) {
      reject(`Parble: ${err}`);
    }
  });
}
