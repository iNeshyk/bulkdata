'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /drivers
 */
module.exports = {
    /**
     * summary: get all drivers
     * description: Get drivers data by phone name

     * parameters: phone
     * produces: application/json
     * responses: 200, 400
     * operationId: getDrivers
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/drivers',
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
                path: '/drivers',
                operation: 'get',
                response: '400'
            }, callback);
        }
    },
    /**
     * summary: Post auth drivers from corezoid
     * description: Post drivers from corezoid

     * parameters: driver
     * produces: application/json
     * responses: 200, 400
     * operationId: postDrivers
     */
    post: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/drivers',
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
                path: '/drivers',
                operation: 'post',
                response: '400'
            }, callback);
        }
    }
};
