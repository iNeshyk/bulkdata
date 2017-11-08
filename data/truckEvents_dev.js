'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /truckEvents
 */
module.exports = {
    /**
     * summary: Post states by the waybills
     * description: By passing in the appropriate options, you can post
states for the waybills

     * parameters: States
     * produces: application/json
     * responses: 201, 400, 409
     * operationId: postStates
     */
    post: {
        201: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/truckEvents',
                operation: 'post',
                response: '201'
            }, callback);
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/truckEvents',
                operation: 'post',
                response: '400'
            }, callback);
        },
        409: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/truckEvents',
                operation: 'post',
                response: '409'
            }, callback);
        }
    }
};
