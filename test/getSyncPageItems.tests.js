import chai from 'chai'
const assert = chai.assert;
const expect = chai.expect;

import { createApiClient, createPreviewApiClient, createCachedApiClient } from './apiClients.config'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/

const ref = {
    publishedContentItemID: 15,
    updatesMadeToPublishedContentItemID: 15
}

describe('getSyncPages:', function () {

    this.timeout('120s');

    it('should retrieve the oldest page items and syncToken', function (done) {
        var api = createApiClient();

        let syncToken = 0;

        //sync from scratch
        api.getSyncPages({
            syncToken: syncToken,
            pageSize: 100,
            locale: 'en-us'
        })
            .then(function (syncRet) {


                assert.isTrue(syncRet.syncToken > 0, "should return a syncToken value.")
                assert.isTrue(syncRet.items.length > 0, "should return items.")
                done();
            })
            .catch(done);

    });


});

