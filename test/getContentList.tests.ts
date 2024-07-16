const {
	createApiClient,
	createPreviewApiClient,
	createCachedApiClient,
	createApiClientWithNewCdn,
} = require('./apiClients.config');

describe('getContentList:', () => {
	jest.setTimeout(120000);

	it('should retrieve a content list in live mode', async () => {
		const api = createApiClient();
		const contentList = await api.getContentList({
			referenceName: 'posts',
			locale: 'en-us',
		});
		expect(contentList.items[0].contentID).toBe(16);
		expect(contentList.items[3].contentID).toBe(15);
	});

	it('should retrieve a content list in preview mode', async () => {
		const api = createPreviewApiClient();
		const contentList = await api.getContentList({
			referenceName: 'posts',
			locale: 'en-us',
		});
		expect(contentList.items[0].contentID).toBe(15);
		expect(contentList.items[1].contentID).toBe(16);
	});

	it('should throw error if referenceName not passed as argument for getContentList', async () => {
		const api = createApiClient();
		let err
		try {
			await api.getContentList({
				someOtherParam: 'posts',
				locale: 'en-us',
			})

		} catch (error) {
			err = error
		}

		expect(err).toBeDefined()

	});

	it('should throw error if locale param is missing in getContentList', async () => {
		const api = createApiClient();

		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()


	});

	it('should throw error if take parameter is NOT a number in getContentList', async () => {
		const api = createApiClient();


		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
				locale: 'en-us',
				take: 'ten',
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()

	});

	it('should throw error if take parameter is a number less than 1 in getContentList', async () => {
		const api = createApiClient();

		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
				locale: 'en-us',
				take: 0,
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()


	});

	it('should throw error if take parameter is a number greater than 250 in getContentList', async () => {
		const api = createApiClient();

		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
				locale: 'en-us',
				take: 251,
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()

	});

	it('should throw error if skip parameter is a number less than 0 in getContentList', async () => {
		const api = createApiClient();

		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
				locale: 'en-us',
				skip: -1,
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()

	});

	it('should throw error if skip parameter is NOT a number in getContentList', async () => {
		const api = createApiClient();

		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
				locale: 'en-us',
				skip: 'ten',
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()
	});

	it('should throw error if direction parameter is NOT "asc" or "desc" in getContentList', async () => {
		const api = createApiClient();

		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
				locale: 'en-us',
				sort: 'fields.title',
				direction: 'up',
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()

	});

	it('should sort the content list in live mode', async () => {
		const api = createApiClient();
		const contentList = await api.getContentList({
			referenceName: 'posts',
			locale: 'en-us',
			sort: 'contentID',
		});
		expect(contentList.items[0].contentID).toBeLessThan(contentList.items[1].contentID);
	});

	it('should validate all filters contain property called \'property\'', async () => {
		const api = createApiClient();

		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
				locale: 'en-us',
				filters: [{ operator: api.types.FilterOperators.EQUAL_TO, value: '40' }],
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()

	});

	it('should validate all filters contain property called \'operator\'', async () => {
		const api = createApiClient();

		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
				locale: 'en-us',
				filters: [{ property: 'properties.versionID', value: '40' }],
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()

	});

	it('should validate all filters contain property called \'value\'', async () => {
		const api = createApiClient();
		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
				locale: 'en-us',
				filters: [{ property: 'properties.versionID', operator: api.types.FilterOperators.EQUAL_TO }],
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()

	});

	it('should validate operator property on all filters', async () => {
		const api = createApiClient();
		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
				locale: 'en-us',
				filters: [{ property: 'properties.versionID', operator: 'xx', value: '40' }],
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()

	});

	it('should validate the filtersLogicOperator to be AND or OR', async () => {
		const api = createApiClient();

		let err
		try {
			await api.getContentList({
				referenceName: 'posts',
				locale: 'en-us',
				filtersLogicOperator: 'SOME',
			})
		} catch (error) {
			err = error
		}
		expect(err).toBeDefined()

	});

	it('should filter the content list in live mode with OR operator between filters', async () => {
		const api = createApiClient();
		const contentList = await api.getContentList({
			referenceName: 'posts',
			locale: 'en-us',
			filters: [
				{ property: 'contentID', operator: api.types.FilterOperators.EQUAL_TO, value: '15' },
				{ property: 'properties.referenceName', operator: api.types.FilterOperators.LIKE, value: 'posts' },
			],
			filtersLogicOperator: api.types.FilterLogicOperators.OR,
		});
		expect(contentList.items[0].contentID).toBe(16);
		expect(contentList.items[3].contentID).toBe(15);
	});

	it('should filter the content list in live mode with AND operator between filters', async () => {
		const api = createApiClient();
		const contentList = await api.getContentList({
			referenceName: 'posts',
			locale: 'en-us',
			filters: [
				{ property: 'contentID', operator: api.types.FilterOperators.EQUAL_TO, value: '16' },
				{ property: 'properties.referenceName', operator: api.types.FilterOperators.LIKE, value: 'posts' },
			],
			filtersLogicOperator: api.types.FilterLogicOperators.AND,
		});
		expect(contentList.items[0].contentID).toBe(16);
		expect(contentList.items.length).toBe(1);
	});

	it('should expand all content links when expandContentLinks are set to true', async () => {
		const api = createApiClient();
		const contentList = await api.getContentList({
			referenceName: 'listwithnestedcontentlink',
			locale: 'en-us',
			expandAllContentLinks: true,
		});
		expect(Array.isArray(contentList.items[0].fields.posts)).toBe(true);
	});

	it('should NOT expand all content links when expandContentLinks are set to false', async () => {
		const api = createApiClient();
		const contentList = await api.getContentList({
			referenceName: 'listwithnestedcontentlink',
			locale: 'en-us',
			expandAllContentLinks: false,
		});
		expect(Array.isArray(contentList.items[0].fields.posts)).toBe(false);
	});

	it('should NOT expand all content links when expandContentLinks is not set at all', async () => {
		const api = createApiClient();
		const contentList = await api.getContentList({
			referenceName: 'listwithnestedcontentlink',
			locale: 'en-us',
		});
		expect(Array.isArray(contentList.items[0].fields.posts)).toBe(false);
	});

	it('should be able to fetch a list using global cdn site', async () => {
		const api = createApiClientWithNewCdn();
		const referenceName = 'posts';
		const contentList = await api.getContentList({
			referenceName: referenceName,
			locale: 'en-us',
		});
		expect(contentList.items[0].properties.referenceName).toBe(referenceName);
	});
});
