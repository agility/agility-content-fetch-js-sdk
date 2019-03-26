import chai from 'chai'
const assert = chai.assert;
const expect = chai.expect;

import agility from '../src/content-fetch'

function createApiClient() {
    var api = agility.getApi({
        instanceID: '1234-1234',
        accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
        languageCode: 'en-us'
    });
    return api;
}

function createPreviewApiClient() {
    var api = agility.getApi({
        instanceID: '1234-1234',
        accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
        languageCode: 'en-us',
        isPreview: true
    });
    return api;
}

describe('Api', function() {

    this.timeout("30s");

    /* GET API CLIENT */
    it('should return an api client object from getApi', function(done) {
        var api = createApiClient();
        assert.strictEqual(typeof(api), "object");
        done();
    })

    it('should return an api client object in preview mode', function(done) {
        var api = createPreviewApiClient();
        assert.strictEqual(api.config.isPreview, true);
        done();
    })

    it('should contain method for getContentItem', function(done) {
        var api = createApiClient();
        assert.strictEqual(typeof(api.getContentItem), "function");
        done();
    })

    it('should contain method for getContentList', function(done) {
        var api = createApiClient();
        assert.strictEqual(typeof(api.getContentList), "function");
        done();
    })

    it('should contain method for getPage', function(done) {
        var api = createApiClient();
        assert.strictEqual(typeof(api.getPage), "function");
        done();
    })

    it('should contain method for getSitemapFlat', function(done) {
        var api = createApiClient();
        assert.strictEqual(typeof(api.getSitemapFlat), "function");
        done();
    })

    it('should contain method for getSitemapNested', function(done) {
        var api = createApiClient();
        assert.strictEqual(typeof(api.getSitemapNested), "function");
        done();
    })

    it('should throw an error if instanceID is not passed-in to getApi', function(done) {
        expect(function() {
            var api = agility.getApi({
                accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg=='
            });
            assert.strictEqual(typeof(api), "object");
            done();
        }).to.throw( TypeError );
        done();
    });

    it('should throw an error if accessToken is not passed-in to getApi', function(done) {
        expect(function() {
            var api = agility.getApi({
                instanceID: '1234-1234'
            });
            assert.strictEqual(typeof(api), "object");
            done();
        }).to.throw( TypeError );
        done();
    });

    /* CONTENT ITEM ******************************************************/
    it('should retrieve a content item in live mode', function(done) {
        var api = createApiClient();
        api.getContentItem({
            contentID: 22,
            languageCode: 'en-us'
        })
        .then(function(contentItem) {
            assert.strictEqual(contentItem.contentID, 22);
            done();
        })
        .catch(done);
    })

    it('should retrieve a content item in preview mode', function(done) {
        var api = createPreviewApiClient();
        api.getContentItem({
            contentID: 22,
            languageCode: 'en-us'
        })
        .then(function(contentItem) {
            assert.strictEqual(contentItem.contentID, 22);
            done();
        })
        .catch(done);
    })

    it('should throw error if contentID not passed as argument for getContentItem', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getContentItem({
                someOtherParam: 22,
                languageCode: 'en-us'
            })
            .then(function(contentItem) {
                assert.strictEqual(contentItem.contentID, 22);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    it('should throw error if languageCode not passed as argument for getContentItem', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getContentItem({
                contentID: 22
            })
            .then(function(contentItem) {
                assert.strictEqual(contentItem.contentID, 22);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    /* CONTENT LIST *****************************************************/
    it('should retrieve a content list in live mode', function(done) {
        var api = createApiClient();
        api.getContentList({
            referenceName: 'posts',
            languageCode: 'en-us'
        })
        .then(function(contentList) {
            assert.strictEqual(contentList.items[0].contentID, 24);
            assert.strictEqual(contentList.items[1].contentID, 25);
            done();
        })
        .catch(done);
    })

    it('should retrieve a content list in preview mode', function(done) {
        var api = createPreviewApiClient();
        api.getContentList({
            referenceName: 'posts',
            languageCode: 'en-us'
        })
        .then(function(contentList) {
            assert.strictEqual(contentList.items[0].contentID, 24);
            assert.strictEqual(contentList.items[1].contentID, 25);
            done();
        })
        .catch(done);
    })

    it('should throw error if referenceName not passed as argument for getContentList', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getContentList({
                someOtherParam: 'posts',
                languageCode: 'en-us'
            })
            .then(function(contentList) {
                assert.strictEqual(contentList[0].contentID, 24);
                assert.strictEqual(contentList[1].contentID, 25);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    it('should throw error if languageCode param is missing in getContentList', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getContentList({
                referenceName: 'posts'
            })
            .then(function(contentList) {
                assert.strictEqual(contentList[0].contentID, 24);
                assert.strictEqual(contentList[1].contentID, 25);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    it('should throw error if take parameter is NOT a number in getContentList', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getContentList({
                referenceName: 'posts',
                languageCode: 'en-us',
                take: 'ten'
            })
            .then(function(contentList) {
                assert.strictEqual(contentList[0].contentID, 24);
                assert.strictEqual(contentList[1].contentID, 25);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    it('should throw error if take parameter is a number less than 1 in getContentList', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getContentList({
                referenceName: 'posts',
                languageCode: 'en-us',
                take: 0
            })
            .then(function(contentList) {
                assert.strictEqual(contentList[0].contentID, 24);
                assert.strictEqual(contentList[1].contentID, 25);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    it('should throw error if take parameter is a number greater than 50 in getContentList', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getContentList({
                referenceName: 'posts',
                languageCode: 'en-us',
                take: 51
            })
            .then(function(contentList) {
                assert.strictEqual(contentList[0].contentID, 24);
                assert.strictEqual(contentList[1].contentID, 25);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    it('should throw error if skip parameter is a number less than 0 in getContentList', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getContentList({
                referenceName: 'posts',
                languageCode: 'en-us',
                skip: -1
            })
            .then(function(contentList) {
                assert.strictEqual(contentList[0].contentID, 24);
                assert.strictEqual(contentList[1].contentID, 25);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    it('should throw error if skip parameter is NOT a number in getContentList', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getContentList({
                referenceName: 'posts',
                languageCode: 'en-us',
                skip: 'ten'
            })
            .then(function(contentList) {
                assert.strictEqual(contentList[0].contentID, 24);
                assert.strictEqual(contentList[1].contentID, 25);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    it('should throw error if direction parameter is NOT "asc" or "desc" in getContentList', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getContentList({
                referenceName: 'posts',
                languageCode: 'en-us',
                sort: 'fields.title',
                direction: 'up'
            })
            .then(function(contentList) {
                assert.strictEqual(contentList[0].contentID, 24);
                assert.strictEqual(contentList[1].contentID, 25);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })


    /* GET PAGE *********************************************************/
    it('should retrieve a page in live mode', function(done) {
        var api = createApiClient();
        api.getPage({
            pageID: 1,
            languageCode: 'en-us'
        })
        .then(function(page) {
            assert.strictEqual(page.pageID, 1);
            done();
        })
        .catch(done);
    })

    it('should retrieve a page in preview mode', function(done) {
        var api = createPreviewApiClient();
        api.getPage({
            pageID: 1,
            languageCode: 'en-us'
        })
        .then(function(page) {
            assert.strictEqual(page.pageID, 1);
            done();
        })
        .catch(done);
    })

    it('should throw error if pageID not passed as argument for getPage', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getPage({
                someOtherParam: 1,
                languageCode: 'en-us'
            })
            .then(function(page) {
                assert.strictEqual(page.pageID, 1);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    it('should throw error if languageCode not passed as argument for getPage', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getPage({
                pageID: 1
            })
            .then(function(page) {
                assert.strictEqual(page.pageID, 1);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    /* GET SITEMAP FLAT ***********************************************/
    it('should retrieve a sitemap in a flat format in live mode', function(done) {
        var api = createApiClient();
        api.getSitemapFlat({
            channelName: 'website',
            languageCode: 'en-us'
        })
        .then(function(sitemap) {
            assert.strictEqual(sitemap['/home'].pageID, 1);
            done();
        })
        .catch(done);
    })

    it('should retrieve a sitemap in a flat format in preview mode', function(done) {
        var api = createPreviewApiClient();
        api.getSitemapFlat({
            channelName: 'website',
            languageCode: 'en-us'
        })
        .then(function(sitemap) {
            assert.strictEqual(sitemap['/home'].pageID, 1);
            done();
        })
        .catch(done);
    })

    it('should throw error if channelName not passed as argument for getSitemapFlat', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getSitemapFlat({
                someOtherParam: 1,
                languageCode: 'en-us'
            })
            .then(function(sitemap) {
                assert.strictEqual(sitemap['/home'].pageID, 1);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    it('should throw error if languageCode not passed as argument for getSitemapFlat', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getSitemapFlat({
                channelName: 'website'
            })
            .then(function(sitemap) {
                assert.strictEqual(sitemap['/home'].pageID, 1);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })


    /* GET SITEMAP NESTED **************************************************/
    it('should retrieve a sitemap in a nested format in live mode', function(done) {
        var api = createApiClient();
        api.getSitemapNested({
            channelName: 'website',
            languageCode: 'en-us'
        })
        .then(function(sitemap) {
            assert.strictEqual(sitemap[0].pageID, 1);
            done();
        })
        .catch(done);
    })

    it('should retrieve a sitemap in a nested format in preview mode', function(done) {
        var api = createPreviewApiClient();
        api.getSitemapNested({
            channelName: 'website',
            languageCode: 'en-us'
        })
        .then(function(sitemap) {
            assert.strictEqual(sitemap[0].pageID, 1);
            done();
        })
        .catch(done);
    })

    it('should throw error if channelName not passed as argument for getSitemapNested', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getSitemapNested({
                someOtherParam: 1,
                languageCode: 'en-us'
            })
            .then(function(sitemap) {
                assert.strictEqual(sitemap[0].pageID, 1);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    it('should throw error if languageCode not passed as argument for getSitemapNested', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getSitemapNested({
                channelName: 'website'
            })
            .then(function(sitemap) {
                assert.strictEqual(sitemap[0].pageID, 1);
                done();
            })
            .catch(done);
        }).to.throw( TypeError );
        done();
    })

    
});
