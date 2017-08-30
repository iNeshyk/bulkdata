'use strict';
var Mockgen = require('./mockgen.js');
var Promise = require('promise');
var db = require('../lib/mssql');
var q  = require('./queries');
var sha1 = require('sha1');

/**
 * Operations on /drivers
 */
module.exports = {
    /**
     * summary: Post auth drivers from corezoid
     * description: Post drivers from corezoid

     * parameters: waybillKey
     * produces: application/json
     * responses: 200, 400
     * operationId: postDrivers
     */
    post: {
        200: function (req, res, callback) {
          db.reqPool(q.addDrivers(req.body), {}, function(data, err) {
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

        }
    },
    get: {
      200: function (req, res, callback) {
          db.reqPool(q.getDrivers(req.query.phone), {}, function(data, err){
                if (err) {
                  res.status(505);
                  res.send(err);
                }else{
                  res.send(data);
                }
              });
      },
        400: function (req, res, callback) {

        }
    },
};
