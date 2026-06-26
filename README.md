[![Build Status](https://agility.visualstudio.com/Agility%20CMS/_apis/build/status/Fetch%20API/Agility%20Content%20Fetch%20JS%20SDK?branchName=master)](https://agility.visualstudio.com/Agility%20CMS/_build/latest?definitionId=59&branchName=master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c45f5d6e-923b-4019-820e-826e6185017d/deploy-status)](https://app.netlify.com/sites/agilitydocs/deploys)

# Agility Content Fetch JS SDK

This is the official JavaScript/TypeScript library for accessing live and preview content from your [Agility CMS](https://agilitycms.com) instance.

You can use this in both Node.js and browser-based JavaScript apps.

Don't have an Agility CMS instance? Sign up for [Free Trial](https://agilitycms.com/free) today!

## Features

- Query the high-availability, CDN-backed Agility Fetch REST API
- Get a sitemap for a given channel
- Get a page, including its content zones, modules, and their content
- Get a content item
- Query a content list using a filter syntax
- Get the details of a media gallery
- Keep track of syncing content to your app

## Getting Started

In order to use this SDK, you'll need to install the `@agility/content-fetch` package and you'll also need to authenticate your requests.

### Prerequisites

You must have access to an Agility instance to retrieve the _guid_ and generate your _apiKey_. Or, you must have these values provided to you.

### Installation

**npm**

```
npm install @agility/content-fetch
```

**yarn**

```
yarn add @agility/content-fetch
```

### Making a Request

```javascript
import agility from "@agility/content-fetch"

//initialize the api client
const api = agility.getApi({
	guid: "[guid]",
	apiKey: "[your-api-key]",
})

//make the request: get a content item with the ID 22 in locale 'en-us'
const contentItems = await api.getContentItem({
	contentID: 22,
	locale: "en-us",
})
```

## Documentation

Full documentation for this SDK can be found in our [Agility Fetch JS SDK Reference Doc](https://agilitycms.com/docs/javascript/content-fetch-js-sdk).

For docs & help around Agility CMS, please see [Agility CMS Documentation](https://agilitycms.com/docs)

## Tutorials

[About using the Content Fetch API and authenticating API calls](https://agilitycms.com/docs/developers/content-fetch-api)

[Retrieving your API Key(s), Guid, and API URL](https://agilitycms.com/docs/training-guide/admin-api-keys)

[Making your First Call with the Content Fetch API](https://agilitycms.com/docs/training-guide/developer-api-basics)

[Calilng the Content Fetch API using the Javascript SDK](https://agilitycms.com/docs/javascript/content-fetch-js-sdk)

[Page Management in a Headless CMS](https://agilitycms.com/docs/developers/page-management-in-a-headless-cms)

[Using Agility CMS with Next.js](https://agilitycms.com/docs/nextjs)

[Creating a Next.js component in Agility CMS](https://agilitycms.com/docs/training-guide/developer-component-development)

[Creating a page model in Agility CMS](https://agilitycms.com/docs/developers/page-models)

[Deploying your Agility CMS Next.js app to Vercel](https://agilitycms.com/docs/nextjs/deploying-next-js-to-vercel)

[Webhooks](https://agilitycms.com/docs/developers/webhooks)

## Contributing

If you would like to contribute to this SDK, you can fork the repository and submit a pull request. We'd love to include your updates.

### Running the Tests

An essential part of contributing to this SDK is adding and running unit tests to ensure the stability of the project.

```
> npm run test
```
