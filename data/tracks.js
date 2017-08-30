'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /tracks
 */
module.exports = {
    /**
     * summary: get track by id
     * description: Get trucks by id

     * parameters: id
     * produces: application/json
     * responses: 200, 400
     * operationId: getTrack
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/tracks',
                operation: 'get',
                response: '200'
            }, callback);
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/tracks',
                operation: 'get',
                response: '400'
            }, callback);
        }
    },
    /**
     * summary: Post track
     * description: Post tracks from corezoid

     * parameters: track
     * produces: application/json
     * responses: 200, 400
     * operationId: postTrack
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/tracks',
                operation: 'post',
                response: '200'
            }, callback);
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/tracks',
                operation: 'post',
                response: '400'
            }, callback);
        }
    }
};
