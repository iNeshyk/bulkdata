'use strict';
var dataProvider = require('../data/ping.js');
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
     */
    get: function ping(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['get']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
