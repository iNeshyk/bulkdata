'use strict';
var db = require('../../../lib/mssql');
var q  = require('../.././queries');
/**
 * Operations on /account/waybills/data
 */
module.exports = {
    /**
     * summary: post an array of waybill to subscription
     * description: Post an array of waybill to subscription

     * parameters: sourceID, waybill
     * produces: application/json
     * responses: 200, 400, 500
     * operationId: waybilss_data
     */
    post: {
        200: function (req, res, callback) {
          db.reqPool(q.waybill_subscribe(req.query.sourceID, req.body), {}, function(data, err){
                if (err) {
                  res.status(505);
                  res.send(err);
                }else{
                  res.send(data);
                }
              });
        },
        400: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            // Mockgen().responses({
            //     path: '/account/waybills/data',
            //     operation: 'post',
            //     response: '400'
            // }, callback);
        },
        500: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            // Mockgen().responses({
            //     path: '/account/waybills/data',
            //     operation: 'post',
            //     response: '500'
            // }, callback);
        }
    }
};
