'use strict';
var Mockgen = require('./mockgen.js');
var Promise = require('promise');
var db = require('../lib/mssql');
var q  = require('./queries');
var sha1 = require('sha1');
/**
 * Operations on /waybills
 */

module.exports = {
    /**
     * summary: get all waybills to you account
     * description: By passing in the appropriate options, you can get
available updated waybills in the system

     * parameters: id, limit
     * produces: application/json
     * responses: 200, 400
     * operationId: getWaybills
     */
    get: {
        200: function (req, res, callback) {
            db.reqPool(q.getWaybills(req.query.sourceID, req.query.id, req.query.limit), {}, function(data, err){
                  if (err) {
                    res.status(505);
                    res.send(err);
                  }else{

                    //join truckEvents to each Waybill object
                    var EntryGUID = '';
                    data.forEach(function (columns) {
                        EntryGUID = EntryGUID+`'${columns.EntryGUID}'`+',';
                        columns.TrackEvents = [];
                    });
                    EntryGUID = EntryGUID.substring(0,EntryGUID.length-1);

                    db.reqPool(q.getTrackEvents(EntryGUID), {}, function(dataQ, err){
                      if (err) {
                        res.status(505);
                        res.send(err);
                      } else {
                          if (EntryGUID) {
                          dataQ.forEach(function (columnsQ) {
                            data.forEach(function (columns) {
                                if (columns.EntryGUID === columnsQ.EntryGUID){
                                    columns.TrackEvents.push(columnsQ);
                                }
                            });

                          });
                        }
                        res.send(data);
                      }
                    });
                  }
                });
        },
        400: function (req, res, callback) {
        }
    },
    /**
     * summary: set waybills inactive
     * description: By passing in the appropriate options, you can set
waybills inactive

     * parameters: waybillKey
     * produces: application/json
     * responses: 200, 400
     * operationId: pushWaybills
     */
    patch: {
        200: function (req, res, callback) {
            db.reqPool(q.patchWaybills(req.query.sourceID, req.body), {}, function(data, err){
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
            //     path: '/waybills',
            //     operation: 'patch',
            //     response: '400'
            // }, callback);
        }
    },
    /**
     * summary: adds an waybill
     * description: Adds an waybill to the system
     * parameters: waybill
     * produces: application/json
     * responses: 201, 400, 409
     * operationId: addWaybill
     */
    post: {
        201: function (req, res, callback) {
            let body     = req.body;
            let hashBody = [];

            for (let i in body) {
              let element = body[i];
              element['EntryInsertDate']   = new Date();
              element['EntryInsertUserID'] = '';
              for(let k in element) {
                if((k==='ConsigneeRegCode') || (k==='EntryGUID') || (k==='OwnerStateRegCode') || (k==='OwnerType')
                      || (k==='ConsigneeType') || (k==='ConsignorType') || (k==='ConsignorRegCode') || (k==='EntryType')){
                  hashBody.push({
                    EntryGUID: element.EntryGUID,
                    Sha1KeyValue: sha1(k+element[k]),
                    Key: k,
                    Value: element[k]
                  });
                }
              }
            }
            db.reqPool(q.addWaybills(req.query.sourceID, body, hashBody), {}, function(data, err) {
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
    put: {
        201: function (req, res, callback) {
            db.reqPool(q.delWaybills(req.body), {}, function(data, err){
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
