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
                accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
                languageCode: 'en-us'
            });
            assert.strictEqual(typeof(api), "object");
            done();
        }).to.throw( TypeError );
        done();
    });

    it('should throw an error if accessToken is not passed-in to getApi', function(done) {
        expect(function() {
            var api = agility.getApi({
                instanceID: '1234-1234',
                languageCode: 'en-us'
            });
            assert.strictEqual(typeof(api), "object");
            done();
        }).to.throw( TypeError );
        done();
    });

    it('should throw an error if languageCode is not passed-in to getApi', function(done) {
        expect(function() {
            var api = agility.getApi({
                instanceID: '1234-1234',
                accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg=='
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
            contentID: 22
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
            contentID: 22
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
                someOtherParam: 22
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
            referenceName: 'posts'
        })
        .then(function(contentList) {
            assert.strictEqual(contentList[0].contentID, 24);
            assert.strictEqual(contentList[1].contentID, 25);
            done();
        })
        .catch(done);
    })

    it('should retrieve a content list in preview mode', function(done) {
        var api = createPreviewApiClient();
        api.getContentList({
            referenceName: 'posts'
        })
        .then(function(contentList) {
            assert.strictEqual(contentList[0].contentID, 24);
            assert.strictEqual(contentList[1].contentID, 25);
            done();
        })
        .catch(done);
    })

    it('should throw error if referenceName not passed as argument for getContentList', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getContentList({
                someOtherParam: 'posts'
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
            pageID: 1
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
            pageID: 1
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
                someOtherParam: 1
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
            channelID: 1
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
            channelID: 1
        })
        .then(function(sitemap) {
            assert.strictEqual(sitemap['/home'].pageID, 1);
            done();
        })
        .catch(done);
    })

    it('should throw error if channelID not passed as argument for getSitemapFlat', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getSitemapFlat({
                someOtherParam: 1
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
            channelID: 1
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
            channelID: 1
        })
        .then(function(sitemap) {
            assert.strictEqual(sitemap[0].pageID, 1);
            done();
        })
        .catch(done);
    })

    it('should throw error if channelID not passed as argument for getSitemapNested', function(done) {
        expect(function() {
            var api = createApiClient();
            api.getSitemapNested({
                someOtherParam: 1
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
