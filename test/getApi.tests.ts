import * as agilityFetch from '../dist/node';

//This is a synchronous test
describe('getApi:', function () {

    jest.setTimeout(120000);

    it('should return an api client object with required params', () => {
        const api = agilityFetch.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        expect(typeof api).toBe("object");
    });

    it('should return an api client object in preview mode', () => {
        const api = agilityFetch.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token',
            isPreview: true
        });
        expect(api.config.isPreview).toBe(true);
    });

    it('should contain method for getContentItem', function (done) {
        const api = agilityFetch.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        expect(typeof (api.getContentItem)).toBe("function");
        done();
    })

    it('should contain method for getContentList', function (done) {
        const api = agilityFetch.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        expect(typeof (api.getContentList)).toBe("function");
        done();
    })

    it('should contain method for getPage', function (done) {
        const api = agilityFetch.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        expect(typeof (api.getPage)).toBe("function");
        done();
    })

    it('should contain method for getSitemapFlat', function (done) {
        const api = agilityFetch.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        expect(typeof (api.getSitemapFlat)).toBe("function");
        done();
    })

    it('should contain method for getSitemapNested', function (done) {
        const api = agilityFetch.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token'
        });
        expect(typeof (api.getSitemapNested)).toBe("function");
        done();
    })

    it('should return an api client with the baseUrl overidden if passed-in correctly as params', function (done) {
        const baseUrl = 'https://fake-url.agilitycms.com';
        const api = agilityFetch.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token',
            baseUrl: baseUrl
        });
        expect(api.config.baseUrl).toBe(baseUrl);
        done();
    });

    it('should return an api client with new stackpath baseUrl based on canada', function (done) {
        const baseUrl = 'https://api-ca.aglty.io/some-guid-c';
        const api = agilityFetch.getApi({
            guid: 'some-guid-c',
            apiKey: 'some-access-token',
            baseUrl: null
        });
        expect(api.config.baseUrl).toBe(baseUrl);
        done();
    });

    it('should return an api client with new stackpath baseUrl based on usa', function (done) {
        const baseUrl = 'https://api.aglty.io/some-guid-u';
        const api = agilityFetch.getApi({
            guid: 'some-guid-u',
            apiKey: 'some-access-token',
            baseUrl: null
        });
        expect(api.config.baseUrl).toBe(baseUrl);
        done();
    });

    it('should return an api client with new stackpath baseUrl based on dev', function (done) {
        const baseUrl = 'https://api-dev.aglty.io/some-guid-d';
        const api = agilityFetch.getApi({
            guid: 'some-guid-d',
            apiKey: 'some-access-token',
            baseUrl: null
        });
        expect(api.config.baseUrl).toBe(baseUrl);
        done();
    });

    it('should return an api client with legacy stackpath baseUrl', function (done) {
        const baseUrl = 'https://some-guid-api.agilitycms.cloud';
        const api = agilityFetch.getApi({
            guid: 'some-guid',
            apiKey: 'some-access-token',
            baseUrl: null
        });
        expect(api.config.baseUrl).toBe(baseUrl);
        done();
    });

    // TESTING EXCEPTIONS ----------------------------------------------------

    it('should throw an error if guid is not passed-in', () => {
        expect(() => {
            agilityFetch.getApi({
                apiKey: 'some-access-token'
            });
        }).toThrow(TypeError);
    });

    it('should throw an error if apiKey is not passed-in', () => {
        expect(() => {
            agilityFetch.getApi({
                guid: 'some-guid',
            });
        }).toThrow(TypeError);
    });

    it('should throw an error if baseUrl is passed-in and does not start with "https"', () => {
        expect(() => {
            agilityFetch.getApi({
                guid: 'some-guid',
                apiKey: 'some-access-token',
                baseUrl: 'http://insecuresite.com'
            });
        }).toThrow(TypeError);
    });

});
