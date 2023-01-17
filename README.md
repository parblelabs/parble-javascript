# Parble Javascript SDK

Official Node.js SDK for [Parble](https://parble.com/home) intelligent document processing API.

To access the API you will need a Parble account. Sign up for free at
[signup](https://parble.com/signup).

## Installation
### With NPM
```bash
npm install parble
```

## Constructor
The SDK requires 2 settings to connect and authenticate to the Parble API, which can be found in your Parble dashboard:
- The name of your tenant
- Your personal API-Key

```js
const parble = require("parble");

const parbleSDK = new parble.parbleSDK(PARBLE_TENANT, PARBLE_API_KEY);
```

## Examples
### Get predictions from a file upload
#### With file path
To process a file you just need to call the files.post method indicating the file path as argument.
```js
const predictedFileJson = await parbleSDK.files.post("/path/to/file");

console.log(predictedFileJson);
// Expect a JSON with: id, filename, timings, automated, number_of_pages and documents
```

### Check predictions from a file id
To check predictions from a previously processed file you need to call the files.get method using the file id as argument.
```js
const fileJson = await parbleSDK.files.get("fileID");

console.log(fileJson);
// Expect a JSON with: id, filename, timings, automated, number_of_pages and documents
```
