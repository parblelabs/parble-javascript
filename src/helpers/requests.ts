const _requestOptions = (
  method: string,
  apiKey: string,
  extra_headers?: { [name: string]: string | number },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
): RequestInit => {
  const options = {
    method: method,
    headers: {
      'X-API-Key': `${apiKey}`,
      ...extra_headers,
    },
    body: body,
  };

  return { ...options };
};

export async function _request<T>(
  method: string,
  apiURL: string,
  path: string,
  apiKey: string,
  extra_headers?: { [name: string]: string | number },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
): Promise<T> {
  const requestOptions = _requestOptions(method, apiKey, extra_headers, body);
  const response = await fetch(`https://${apiURL}${path}`, requestOptions);
  const result = await response.json();

  return result;
}
