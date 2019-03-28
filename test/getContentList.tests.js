import chai from 'chai'
const assert = chai.assert;
const expect = chai.expect;

import { createApiClient, createPreviewApiClient, createCatchedApiClient } from './apiClients.config'

/* 
    This file contains static references to content from the instance configured in the apiClient.config file.
*/


/* CONTENT LIST *****************************************************/
describe('getContentList:', function() {

    this.timeout('120s');

    it('should retrieve a content list in live mode', function(done) {
        var api = createApiClient();
        api.getContentList({
            referenceName: 'posts',
            languageCode: 'en-us'
        })
        .then(function(contentList) {
            assert.strictEqual(contentList.items[0].contentID, 15);
            assert.strictEqual(contentList.items[1].contentID, 16);
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
            assert.strictEqual(contentList.items[0].contentID, 15);
            assert.strictEqual(contentList.items[1].contentID, 16);
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
})
