'use strict';
var Mockgen = require('../mockgen.js');
/**
 * Operations on /account/discard
 */
module.exports = {
    /**
     * summary: discard all waybills from your subscription
     * description: Discard all waybilss from your subscription

     * parameters: sourceID
     * produces: application/json
     * responses: 200, 400, 500
     * operationId: discard
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/account/discard',
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
                path: '/account/discard',
                operation: 'get',
                response: '400'
            }, callback);
        },
        500: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/account/discard',
                operation: 'get',
                response: '500'
            }, callback);
        }
    }
};
