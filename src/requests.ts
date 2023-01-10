import https, { RequestOptions } from 'https';

const _requestOptions = (
  method: string,
  apiUrl: string,
  path: string,
  apiKey: string,
  extra_headers?: { [name: string]: string | number },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra_options?: any
): RequestOptions => {
  const options = {
    method: method,
    host: apiUrl,
    path: path,
    headers: {
      Accept: 'application/json',
      'X-API-Key': `${apiKey}`,
      ...extra_headers,
    },
    ...extra_options,
  };

  return { ...options };
};

export function _request<T>(
  method: string,
  apiURL: string,
  path: string,
  apiKey: string,
  extra_headers?: { [name: string]: string | number },
  // eslint-disable-next-line @typescript-eslint/ban-types
  extra_options?: Object
): Promise<T> {
  const requestOptions = _requestOptions(
    method,
    apiURL,
    path,
    apiKey,
    extra_headers,
    extra_options
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
            reject(
              `Parble: ${parbleResponse.error}: ${parbleResponse.reason} ${parbleRes.statusCode}`
            );
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
