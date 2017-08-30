'use strict';
var Mockgen = require('./mockgen.js');
var Promise = require('promise');
var db = require('../lib/mssql');
var q  = require('./queries');
var sha1 = require('sha1');
/**
 * Operations on /tracks
 */
module.exports = {
    /**
     * summary: get track by id
     * description: Get trucks by id

     * parameters: id
     * produces: application/json
     * responses: 200, 400
     * operationId: getTrack
     */
    get: {
        200: function (req, res, callback) {
          db.reqPool(q.getTracks(req.query.id), {}, function(data, err){
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
    /**
     * summary: Post track
     * description: Post tracks from corezoid

     * parameters: track
     * produces: application/json
     * responses: 200, 400
     * operationId: postTrack
     */
    post: {
        200: function (req, res, callback) {
          db.reqPool(q.addTracks(req.body), {}, function(data, err) {
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
    }
};
