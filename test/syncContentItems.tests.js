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

describe('syncContentItems:', function () {

    this.timeout('120s');

    it('should retrieve the oldest content items and ticks', function (done) {
        var api = createApiClient();

        let ticks = 0;

        //sync from scratch
        api.syncContentItems({
            ticks: ticks,
            pageSize: 100,
            languageCode: 'en-us'
        })
            .then(function (syncRet) {

                assert.isTrue(syncRet.ticks > 0, "should return a ticks value.")
                assert.isTrue(syncRet.items.length > 0, "should return items.")
                done();
            })
            .catch(done);

    });


});

