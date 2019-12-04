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

    it('should retrieve the oldest 100 content items', function (done) {
        var api = createApiClient();

        let maxVersionID = 0;

        //sync from scratch
        api.syncContentItems({
            maxVersionID: maxVersionID,
            pageSize: 100,
            languageCode: 'en-us'
        })
            .then(function (items) {

                assert.isTrue(items.length > 0, "should return items.")

                // var lastItem = items[items.length - 1];
                // console.log("lastItem");
                // console.log(items.length);
                // console.log(lastItem);
                // maxVersionID = lastItem.properties.versionID;

                done();



            })
            .catch(done);


        // //sync from the previous max...
        // api.syncContentItems({
        //     maxVersionID: maxVersionID,
        //     pageSize: 100,
        //     languageCode: 'en-us'
        // })
        //     .then(function (items) {
        //         if (items.length > 0) {
        //             assert.isTrue(items[0].properties.versionID > maxVersionID, `should return items with versionID > ${maxVersionID}.`)
        //         }
        //         done();
        //     })
        //     .catch(done);
    });


});

