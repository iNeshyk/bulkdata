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

     * parameters: sourceID, id, limit
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
     * summary: set waybills inactive
     * description: By passing in the appropriate options, you can set
waybills inactive

     * parameters: sourceID, waybillKey
     * produces: application/json
     * responses: 200, 400
     * operationId: pushWaybills
     */
    patch: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/waybills',
                operation: 'patch',
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
                operation: 'patch',
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
    },
    /**
     * summary: delete an waybill
     * description: Delete an waybill from the system
     * parameters: delWaybill
     * produces: application/json
     * responses: 201, 400
     * operationId: delWaybill
     */
    delete: {
        201: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/waybills',
                operation: 'delete',
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
                operation: 'delete',
                response: '400'
            }, callback);
        }
    }
};
