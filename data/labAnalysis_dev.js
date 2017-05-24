'use strict';
var Mockgen = require('./mockgen.js');
var Promise = require('promise');
var db = require('../lib/mssql');
var q  = require('./queries');
var sha1 = require('sha1');

/**
 * Operations on /labAnalysis
 */
module.exports = {
    /**
     * summary: get all lab analysis to you account
     * description: By passing in the appropriate options, you can get
available updated laboratory abalysis in the system

     * parameters: id, limit
     * produces: application/json
     * responses: 200, 400
     * operationId: getlabAnalysis
     */
    get: {

        200: function (req, res, callback) {
            db.reqPool(q.getLabAnalysis(req.query.sourceID, req.query.id, req.query.limit), {}, function(data, err){
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
     * summary: set waybills inactive
     * description: By passing in the appropriate options, you can set
lab analys inactive

     * parameters: labAnalysKey
     * produces: application/json
     * responses: 200, 400
     * operationId: pushLabAnalysis
     */
    patch: {
        200: function (req, res, callback) {

            db.reqPool(q.patchLabAnalysis(req.query.sourceID, req.body), {}, function(data, err){
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
     * summary: adds an waybill
     * description: Adds an laboratory analysis to the system
     * parameters: labAnalys
     * produces: application/json
     * responses: 201, 400, 409
     * operationId: addLabAnalysis
     */
    post: {
        201: function (req, res, callback) {

            let body     = req.body;
            let hashBody = [];
            let usersEntryGuid = [];

            for (let i in body) {
              let element = body[i];
              element['EntryInsertDate']   = new Date();
              element['EntryInsertUserID'] = ' ';
              for(let k in element) {
                if((k==='ConsigneeRegCode') || (k==='FormID') || (k==='OwnerStateRegCode') ){
                  hashBody.push({
                    EntryGUID: element.FormID,
                    Sha1KeyValue: sha1(k+element[k]),
                    Key: k,
                    Value: element[k]
                  });
                }
              }
            }

            db.reqPool(q.addLabAnalysis(body, hashBody), {}, function(data, err) {
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
        409: function (req, res, callback) {

        }
    },
    /**
     * summary: delete an lab analys
     * description: Delete an laboratory analys from the system
     * parameters: delLabAnalys
     * produces: application/json
     * responses: 201, 400
     * operationId: delLabAnalys
     */
    put: {
        201: function (req, res, callback) {
          db.reqPool(q.delLabAnalysis(req.body), {}, function(data, err){
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
    }
};
