'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /labAnalysis
 */
module.exports = {
    /**
     * summary: get all lab analysis to you account
     * description: By passing in the appropriate options, you can get
available updated laboratory abalysis in the system

     * parameters: sourceID, id, limit
     * produces: application/json
     * responses: 200, 400
     * operationId: getlabAnalysis
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/labAnalysis',
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
                path: '/labAnalysis',
                operation: 'get',
                response: '400'
            }, callback);
        }
    },
    /**
     * summary: set waybills inactive
     * description: By passing in the appropriate options, you can set
lab analys inactive

     * parameters: sourceID, labAnalysKey
     * produces: application/json
     * responses: 200, 400
     * operationId: pushLabAnalysis
     */
    patch: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/labAnalysis',
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
                path: '/labAnalysis',
                operation: 'patch',
                response: '400'
            }, callback);
        }
    },
    /**
     * summary: adds an waybill
     * description: Adds an laboratory analysis to the system
     * parameters: sourceID, labAnalys
     * produces: application/json
     * responses: 201, 400, 409
     * operationId: addLabAnalysis
     */
    post: {
        201: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/labAnalysis',
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
                path: '/labAnalysis',
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
                path: '/labAnalysis',
                operation: 'post',
                response: '409'
            }, callback);
        }
    },
    /**
     * summary: delete an lab analys
     * description: Delete an laboratory analys from the system
     * parameters: delLabAnalys
     * produces: application/json
     * responses: 201, 400
     * operationId: delLabAnalys
     */
    put: {
        201: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/labAnalysis',
                operation: 'put',
                response: '201'
            }, callback);
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/labAnalysis',
                operation: 'put',
                response: '400'
            }, callback);
        }
    }
};
