export const requestOptions = (
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
