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
             res.status(200);
             res.send("pong");
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
             res.status(400);
             res.send("error");
        }
    }
};
