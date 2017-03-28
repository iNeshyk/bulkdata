'use strict';
var Mockgen = require('./mockgen.js');
/**
 * Operations on /ping
 */
module.exports = {
    /**
     * summary: check service alive status
     * description: Checking service status

     * parameters: 
     * produces: application/json
     * responses: 200, 400
     * operationId: ping
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/ping',
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
                path: '/ping',
                operation: 'get',
                response: '400'
            }, callback);
        }
    }
};
