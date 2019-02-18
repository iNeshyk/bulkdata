'use strict';
var Mockgen = require('./mockgen.js');
var Promise = require('promise');
var db = require('../lib/mssql');
var q  = require('./queries');
var sha1 = require('sha1');
/**
 * Operations on /truckEvents
 */
module.exports = {
  
    post: {
        201: function (req, res, callback) {
          db.reqPool(q.addTrackEvents(req.body), {}, function(data, err) {
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
          res.status(400);
          res.send('OK');
          callback();
        },
        409: function (req, res, callback) {
          res.status(409);
          res.send('OK');
          callback();
        }
    }
};
