[![Build Status](https://agility.visualstudio.com/Agility%20CMS/_apis/build/status/Fetch API/Agility%20Content%20Fetch%20JS%20SDK?branchName=master)](https://agility.visualstudio.com/Agility%20CMS/_build/latest?definitionId=59&branchName=master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c45f5d6e-923b-4019-820e-826e6185017d/deploy-status)](https://app.netlify.com/sites/agilitydocs/deploys)

# Agility Content Fetch JS SDK
This is the official JavaScript library for accessing live and preview content from your [Agility](https://agilitycms.com) CMS instance. 

You can use this in both node and browser based JS apps.

## Features
- Queries the high-availability, CDN backed Agility Fetch REST API
- Get a sitemap for a given channel
- Get a page, including its content zones, modules, and their content
- Get a content item
- Query a content list using a filter syntax
- Optional in-memory caching

## Getting Started
In order to use this sdk, you'll need to install the script and you'll also need to authenticate your requests.

### Prerequisites
You must have access to an Agility instance to retrieve the *instanceID* and generate your *apiKey*. Or, you must have these values provided to you.

### Installation
Install it using **npm** (recommended):
```
npm install @agility/content-fetch
```

If necessary, you can also reference a standalone package that can be used in a browser using a traditional **script** tag. In this case, the sdk can be accessed using a global variable by name of `agility`:
```html
<!-- Use a specific version (i.e. 0.4.2) -->
<script type="text/javascript" src="https://unpkg.com/@agility/content-fetch@0.4.2/dist/agility-content-fetch.browser.js"></script>

<!-- Or, Use the latest version -->
<script type="text/javascript" src="https://unpkg.com/@agility/content-fetch@latest/dist/agility-content-fetch.browser.js"></script>
```
### Making a Request
```javascript
import agility from '@agility/content-fetch'

//initialize the api client
const api = agility.getApi({
  instanceID: '191309ca-e675-4be2-bb29-351879528707',
  accessToken: 'aGd13M.fa30c36e553a36f871860407e902da9a7375322457acd6bcda038e60af699411'
});

//make the request: get a content item with the ID '22'
api.getContentItem({
    contentID: 22,
    languageCode: 'en-us'
})
.then(function(contentItem) {
    //on success
    console.log(contentItem);
})
.catch(function(error) {
    //on error
    console.log(error);
});
```

## Documentation
Full documentation for this sdk can be found in our [Agility Fetch JS SDK Reference Doc](https://agilitydocs.netlify.com/agility-content-fetch-js-sdk/).

## Tutorials
Coming soon...


## Contributing
If you would like to contribute to this SDK, you can fork the repository and submit a pull request. We'd love to include your updates.

### Running the Tests
An essential part of contributing to this SDK is adding and running unit tests to ensure the stability of the project.
```
> npm run test
```







