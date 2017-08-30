'use strict';
var dataProvider = require('../data/drivers_dev.js');
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
     */
    get: function getDrivers(req, res, next) {
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
    },
    /**
     * summary: Post auth drivers from corezoid
     * description: Post drivers from corezoid

     * parameters: driver
     * produces: application/json
     * responses: 200, 400
     */
    post: function postDrivers(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['post']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
