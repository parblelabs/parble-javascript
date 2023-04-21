# Parble Javascript SDK
[![Package build](https://github.com/parblelabs/parble-javascript/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/parblelabs/parble-javascript/actions/workflows/npm-publish.yml)

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
import { parbleSDK } from 'parble'

const parble = new parbleSDK(PARBLE_TENANT, PARBLE_API_KEY);
```

## Examples
### Get predictions from a file upload
To process a file you just need to call the files.post method indicating the file local or temp path or using a base64 string as an argument.

### With local or temp* file path
```js
const predictedFileJson = await parble.files.post("/path/to/file");

console.log(predictedFileJson);
// Expect a JSON with: id, filename, timings, automated, number_of_pages and documents
```
*if you are already posting formdata to your node.js application we recommend using 'IncomingForm' from 'formidable' to read the tempfile and use the temp path as an argument.

### With a base64 string
```js
const predictedFileJson = await parble.files.post("data:@file/pdf;base64,JVBERi0c...");

console.log(predictedFileJson);
// Expect a JSON with: id, filename, timings, automated, number_of_pages and documents
```

## Check predictions from a file id
To check predictions from a previously processed file you need to call the files.get method using the file id as argument.
```js
const fileJson = await parble.files.get("id");

console.log(fileJson);
// Expect a JSON with: id, filename, timings, automated, number_of_pages and documents
```
