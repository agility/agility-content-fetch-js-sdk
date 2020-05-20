import chai from 'chai'
const assert = chai.assert;
const expect = chai.expect;

import { createApiClient } from './apiClients.config'

/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/

/* GET URL REDIRECTIONS *********************************************************/


describe('getUrlRedirections:', function() {

	this.timeout('120s');

	let persistedLastAccessDate = null;

    it('should retrieve the list of URL redirections', function(done) {
        var api = createApiClient();
        api.getUrlRedirections({
            lastAccessDate: null
        })
            .then(function({lastAccessDate, items}) {

				assert.isArray(items, "the items should be an array.");
				assert.isDefined(lastAccessDate.getUTCFullYear, "the lastAccessDate should be a date object.");
				assert.isTrue(lastAccessDate.getUTCFullYear() > 2000, "the lastAccessDate should be a recent date.")

				persistedLastAccessDate = lastAccessDate;

                done();
            })
            .catch(done);
	});

	it('should retrieve an empty list of URL redirections with saved last access date', function(done) {
        var api = createApiClient();
        api.getUrlRedirections({
            lastAccessDate: persistedLastAccessDate
        })
            .then(function({lastAccessDate, items}) {

				assert.isArray(items, "the items should be an array.");

				assert.equal(items.length, 0, "the list of items should be empty.")

                done();
            })
            .catch(done);
    });


});
