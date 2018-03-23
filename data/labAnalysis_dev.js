'use strict';
let db = require('../lib/mssql');
let q  = require('./queries');
let sha1 = require('sha1');
let cS = require('./customSubscribe.js');

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
                  } else {
                    let FormID = '';
                    data.forEach(function (columns) {
                        FormID = FormID+`'${columns.FormID}'`+',';
                        columns.Qualities = [];
                    });
                    FormID = FormID.substring(0,FormID.length-1);
                    if (FormID){


                    db.reqPool(q.getLabAnalysisLines(FormID), {}, function(dataQ, err){
                      if (err) {
                        res.status(505);
                        res.send(err);
                      } else {
                        for (let j = 0; j < data.length; j++) {
                            for (let i = 0; i < dataQ.length; i++) {
                              if (data[j].FormID === dataQ[i].FormID){
                                  let qi = JSON.parse(JSON.stringify(dataQ[i]));
                                qi.TransportShipmentID = data[j].TransportShipmentID;
                                data[j].Qualities.push(qi);
                              }
                          }
                        }

                        res.send(data);
                      }
                    });
                  }else {
                      res.send(data);
                    }
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

            let currentCs = cS.getCustomSubscribe();

            for (let i in body) {
              let element = body[i];
              element['EntryInsertDate']   = new Date();
              element['EntryInsertUserID'] = ' ';
              for(let k in element) {
                if((k==='ConsigneeRegCode') || (k==='FormID') || (k==='OwnerStateRegCode') || (k==='OwnerType')
                      || (k==='ConsigneeType') || (k==='ConsignorType') || (k==='ConsignorRegCode') || (k==='EntryType') ){
                  hashBody.push({
                    EntryGUID: element.FormID,
                    Sha1KeyValue: sha1(k+element[k]),
                    Key: k,
                    Value: element[k]
                  });
                }
              }

                //push AND subscribers
                //OwnerType & EntryType
                for (let d=0; d<currentCs.length; d++){

                    let temp_Sha1KeyValue = '';
                    let temp_Key = '';
                    let temp_Value='';

                    for (let j = 0; j < currentCs[d].length;j++){
                        temp_Sha1KeyValue = temp_Sha1KeyValue+currentCs[d][j]+element[currentCs[d][j]];
                        temp_Key = temp_Key+currentCs[d][j];
                        temp_Value = temp_Value+element[currentCs[d][j]];
                    }

                    hashBody.push({
                        EntryGUID: element.EntryGUID,
                        Sha1KeyValue: sha1(temp_Sha1KeyValue),
                        Key: temp_Key,
                        Value: ""+temp_Value
                    });
                }
            }

            db.reqPool(q.addLabAnalysis(req.query.sourceID, body, hashBody), {}, function(data, err) {
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
