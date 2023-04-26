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

#
## Main usage examples

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

#
## Extra features

### Check json from a file id
To check json from a previously processed file you need to call the files.get method using the file id as argument.
```js
const fileJson = await parble.files.get("id");

console.log(fileJson);
// Expect a JSON with: id, filename, timings, automated, number_of_pages and documents
```

### Check your tenant usage stats
To check your tenant usage stats during certain period you may use the following function and providing start and end dates as parameters. Mind that dates are passed as datetime strings.
```js
const usageStats = await parble.stats.usage("start_datetime", "end_datetime");

console.log(usageStats);
// Expect a JSON with the counts of: files, documents and pages
```
In a similar way you can access to the tenant automation rates with the _automation_ functionality under stats.

### Manage your API keys
Ability to create new API keys for different integrations. API keys are all equal so no parameters are required to create more.
```js
const newAPIkey = await parble.apikeys.createOne();

console.log(newAPIkey);
// Expect a JSON with: id, active, expiry_at and token
```
Around this API keys functionality you can also _getAll_ to access the list of all the available API keys, _getOne_ to see the data of a concrete API key or even _deleteOne_ to remove certain API key.

### Create webhooks for your workflows
With the webhook functions you are able to trigger actions when certain event occurs. To configure one you need to provide the event that will trigger it, the target that it will have and, optionally, some extra headers that may be needed. For example, to create a new webhook that triggers when a file is processed that will be sent against a *receive_data* endpoint with an added *extra_needed_header* we could do as follows:
```js
const newWebhook = await parble.webhooks.postOne({
  events: ['document_predict'],
  target: 'https://my_web.app/api/receive_data',
  headers: {
    extra_needed_header: 'secret_thing'
  }
});

console.log(newWebhook);
// Expect a JSON with: id, events, target and headers
```
Around this Webhooks functionality you can also _getAll_ to access the list of all the available Webhooks, _getOne_ to see the data of a concrete Webhook or even _deleteOne_ to remove certain Webhook.

### Check balance of the account
There is the possibility of checking the balance of the account. This functionality provides info about the current balance, the total credit and the total used credit.
```js
const balanceInfo = await parble.accounting.balance();

console.log(balanceInfo);
// Expect a JSON with the money counts of: balance, credit and usage
```

## License
The Parble Javascript SDK is released under the MIT License.