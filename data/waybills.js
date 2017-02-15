'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /waybills
 */
module.exports = {
    /**
     * summary: get all waybills to you account
     * description: By passing in the appropriate options, you can get
available updated waybills in the system

     * parameters: id, limit
     * produces: application/json
     * responses: 200, 400
     * operationId: getWaybills
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/waybills',
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
                path: '/waybills',
                operation: 'get',
                response: '400'
            }, callback);
        }
    },
    /**
     * summary: adds an waybill
     * description: Adds an waybill to the system
     * parameters: waybill
     * produces: application/json
     * responses: 201, 400, 409
     * operationId: addWaybill
     */
    post: {
        201: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/waybills',
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
                path: '/waybills',
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
                path: '/waybills',
                operation: 'post',
                response: '409'
            }, callback);
        }
    }
};
