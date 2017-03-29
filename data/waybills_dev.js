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
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.

            Mockgen().responses({
                path: '/waybills',
                operation: 'get',
                response: '200'
            }, callback);
            */
            db.req(q.getWaybills(req.query.sourceID, req.query.id, req.query.limit), {}, function(data, err){
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

            Mockgen().responses({
                path: '/waybills',
                operation: 'get',
                response: '400'
            }, callback);
            */
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
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */

            // Mockgen().responses({
            //     path: '/waybills',
            //     operation: 'patch',
            //     response: '200'
            // }, callback);
            db.req(q.patchWaybills(req.query.sourceID, req.body), {}, function(data, err){
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
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.

            Mockgen().responses({
                path: '/waybills',
                operation: 'post',
                response: '201'
            }, callback);
            */
            let body     = req.body;
            let hashBody = [];
            let usersEntryGuid = [];

            for (let i in body) {
              let element = body[i];
              element['EntryInsertDate']   = new Date();
              element['EntryInsertUserID'] = '';
              for(let k in element) {
                //set in config
                if((k==='DestinationLocationName') || (k==='EntryGUID')){
                  hashBody.push({
                    EntryGUID: element.EntryGUID,
                    Sha1KeyValue: sha1(k+element[k]),
                    Key: k,
                    Value: element[k]
                  });
                }
              }
            }
            db.req(q.addWaybills(body, hashBody), {}, function(data, err) {
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
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.

            Mockgen().responses({
                path: '/waybills',
                operation: 'post',
                response: '400'
            }, callback);
            */

        },
        409: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.

            Mockgen().responses({
                path: '/waybills',
                operation: 'post',
                response: '409'
            }, callback);
            */
        }
    },
    delete: {
        201: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            // Mockgen().responses({
            //     path: '/waybills',
            //     operation: 'delete',
            //     response: '201'
            // }, callback);
            db.req(q.delWaybills(req.body), {}, function(data, err){
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
            //     operation: 'delete',
            //     response: '400'
            // }, callback);
        }
    }
};
