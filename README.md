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

In most cases you will need to require the Parble module:

```js
const parble = require('parble');
```
However if you're building your own module, or using TypeScript, the equivalent would be:
```js
import * as parble from 'parble';
```
With either of the possibilities the next step is to initialize the Parble client with your settings:
```ts
const parble_sdk = new parble.parbleSDK(my_tenant: string, my_api_key: string);
```
## Main usage examples

### Get predictions from a file upload
After initializing the client, to process a file you need to call the files.post method indicating the file local or temp path or using a base64 string as an argument. After processing is over you can see the results by either chaining to the promise or by async/await.

### With local or temp* file path using chaining
```ts
parble_sdk.files.post("/path/to/your/file").then((file_results: PredictedFileOutput) => {
  console.log(file_results);
});

// Expect a JSON with: id, filename, timings, automated, number_of_pages and documents
```
*if you are already posting formdata to your node.js application we recommend using 'IncomingForm' from 'formidable' to read the tempfile and use the temp path as an argument.

### With a base64 string and using async/await
```js
async function process_file() {
  const file_results = await parble_sdk.files.post("data:@file/pdf;base64,JVBERi0c..."));
  console.log(file_results);
}

// Expect a JSON with: id, filename, timings, automated, number_of_pages and documents
```

## Extra features
We will show here the async/await forms but all can be used by promise chaning also as shown above.
### Check json from a file id
To check json from a previously processed file you need to call the files.get method using the file id as argument.
```ts
async function get_file_results(file_id: string) {
  const file_results = await parble_sdk.files.get(file_id);
  console.log(file_results);
}

// Expect a JSON with: id, filename, timings, automated, number_of_pages and documents
```

### Check your tenant usage stats
To check your tenant usage stats during certain period you may use the following function and providing start and end dates as parameters. Mind that dates are passed as datetime strings, i.ex.: "2023-05-15" or the full "2023-05-15T09:11:51.043170".
```ts
async function get_usage(start_date: string, end_date: string) {
  const usage_stats = await parble_sdk.stats.usage(start_date, end_date);
  console.log(usage_stats);
}

// Expect a JSON with the counts of: files, documents and pages
```
In a similar way you can access to the tenant automation rates with the _automation_ functionality under stats.

### Manage your API keys
Ability to create new API keys for different integrations. API keys are all equal so no parameters are required to create more.
```ts
async function create_key() {
  const new_api_key = await parble_sdk.apikeys.createOne();
  console.log(new_api_key);
}

// Expect a JSON with: id, active, expiry_at and token
```
Around this API keys functionality you can also _getAll_ to access the list of all the available API keys, _getOne_ to see the data of a concrete API key or even _deleteOne_ to remove certain API key.


### Check balance of the account
There is the possibility of checking the balance of the account. This functionality provides info about the current balance, the total credit and the total used credit.
```ts
async function check_balance() {
  const balance = await parble_sdk.accounting.balance();
  console.log(balance);
}

// Expect a JSON with the money counts of: balance, credit and usage
```

## License
The Parble Javascript SDK is released under the MIT License.