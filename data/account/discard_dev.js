'use strict';
var db = require('../../lib/mssql');
var q  = require('.././queries');
/**
 * Operations on /account/discard
 */
module.exports = {
    /**
     * summary: discard all waybills from your subscription
     * description: Discard all waybilss from your subscription

     * parameters: 
     * produces: application/json
     * responses: 200, 400, 500
     * operationId: discard
     */
    get: {
        200: function (req, res, callback) {
            db.reqPool(q.discard(req.query.sourceID), {}, function(data, err) {
                if (err) {
                    res.status(505);
                    res.send(err);
                } else {
                    res.send(data);
                }
                callback();
            });
        },
        400: function (req, res, callback) {

        },
        500: function (req, res, callback) {

        }
    }
};
