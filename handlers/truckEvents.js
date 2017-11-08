'use strict';
var dataProvider = require('../data/truckEvents_dev.js');
/**
 * Operations on /truckEvents
 */
module.exports = {
    /**
     * summary: Post states by the waybills
     * description: By passing in the appropriate options, you can post
states for the waybills

     * parameters: States
     * produces: application/json
     * responses: 201, 400, 409
     */
    post: function postStates(req, res, next) {
        /**
         * Get the data for response 201
         * For response `default` status 200 is used.
         */
        var status = 201;
        var provider = dataProvider['post']['201'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
