'use strict';
var Mockgen = require('../../mockgen.js');
/**
 * Operations on /account/labAnalysis/data
 */
module.exports = {
    /**
     * summary: post an array of waybill to subscription
     * description: Post an array of Laboratory analysis to subscription

     * parameters: sourceID, waybill
     * produces: application/json
     * responses: 200, 400, 500
     * operationId: waybilss_labAnalysis
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/account/labAnalysis/data',
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
                path: '/account/labAnalysis/data',
                operation: 'post',
                response: '400'
            }, callback);
        },
        500: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/account/labAnalysis/data',
                operation: 'post',
                response: '500'
            }, callback);
        }
    }
};
