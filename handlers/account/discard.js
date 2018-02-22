'use strict';
var dataProvider = require('../../data/account/discard_dev.js');
/**
 * Operations on /account/discard
 */
module.exports = {
    /**
     * summary: discard all waybills from your subscription
     * description: Discard all waybilss from your subscription

     * parameters: sourceID
     * produces: application/json
     * responses: 200, 400, 500
     */
    get: function discard(req, res, next) {
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
