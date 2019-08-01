import chai from 'chai'
const assert = chai.assert;
const expect = chai.expect;

import agility from '../src/content-fetch'


//This is a synchronous test
describe('getApi:', function() {

    this.timeout('120s');
    
    it('should return an api client object with required params', function(done) {
        const api = agility.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        assert.strictEqual(typeof(api), "object");
        done();
    })

    it('should return an api client object in preview mode', function(done) {
        const api = agility.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token',
            isPreview: true
        });
        assert.strictEqual(api.config.isPreview, true);
        done();
    })

    it('should contain method for getContentItem', function(done) {
        const api = agility.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        assert.strictEqual(typeof(api.getContentItem), "function");
        done();
    })

    it('should contain method for getContentList', function(done) {
        const api = agility.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        assert.strictEqual(typeof(api.getContentList), "function");
        done();
    })

    it('should contain method for getPage', function(done) {
        const api = agility.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        assert.strictEqual(typeof(api.getPage), "function");
        done();
    })

    it('should contain method for getSitemapFlat', function(done) {
        const api = agility.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        assert.strictEqual(typeof(api.getSitemapFlat), "function");
        done();
    })

    it('should contain method for getSitemapNested', function(done) {
        const api = agility.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        assert.strictEqual(typeof(api.getSitemapNested), "function");
        done();
    })

    it('should return an api client with the baseUrl overidden if passed-in correctly as params', function(done) {
        const baseUrl = 'https://fake-url.agilitycms.com';
        const api = agility.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token',
            baseUrl: baseUrl
        });
        assert.strictEqual(api.config.baseUrl, baseUrl);
        done();
    });

    // TESTING EXCEPTIONS ----------------------------------------------------

    it('should throw an error if guid is not passed-in', function(done) {
        expect(function() {
            var api = agility.getApi({
                apiKey: 'some-access-token'
            });
            assert.strictEqual(typeof(api), "object");
            done();
        }).to.throw( TypeError );
        done();
    });

    it('should throw an error if apiKey is not passed-in', function(done) {
        expect(function() {
            var api = agility.getApi({
                guid: 'some-guid',
            });
            assert.strictEqual(typeof(api), "object");
            done();
        }).to.throw( TypeError );
        done();
    });

    it('should throw an error if caching maxAge is passed-in and is not a number', function(done) {
        expect(function() {
            var api = agility.getApi({
                guid: 'some-guid',
                apiKey: 'some-access-token',
                caching: {
                    maxAge: 'ten thousand miliseconds'
                }
            });
            assert.strictEqual(typeof(api), "object");
            done();
        }).to.throw( TypeError );
        done();
    });


    it('should throw an error if baseUrl is passed-in and is does not start with "https"', function(done) {
        expect(function() {
            var api = agility.getApi({
                guid: 'some-guid',
                apiKey: 'some-access-token',
                baseUrl: 'http://insecuresite.com'
            });
            assert.strictEqual(typeof(api), "object");
            done();
        }).to.throw( TypeError );
        done();
    });
 
});
