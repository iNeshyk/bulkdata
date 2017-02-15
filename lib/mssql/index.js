"use strict";

const Connection = require('tedious').Connection;
const Request    = require('tedious').Request

const config = require('./dbconfig.json');
let connection;
let request;

module.exports = {

  connect: (callback) => {
    connection = new Connection(config);
    connection.on('connect', function(err) {
      callback(err);
    });
    connection.on('error', function(err) {
      callback(err);
    });
  },

  req: (query, params, callback) => {
    request = new Request(query, function(err, rowCount, rows) {
       if (err) {
            callback(null,err);
          }else {
            let jsonArray = []
            rows.forEach(function (columns) {
                var rowObject ={};
                columns.forEach(function(column) {
                    rowObject[column.metadata.colName] = column.value;
                });
                jsonArray.push(rowObject)
            });
            callback(jsonArray,null);
          }
    });
    for(let kv in params){
        request.addParameter(kv, TYPES.NVarChar,params[kv]);
    }
    connection.execSql(request);
  },

  addBulk: (bulks, table, callback) => {

    let bulkLoad = connection.newBulkLoad(table, function (err, rowCount, rows) {
      console.log('inserted %d rows', rowCount);
      if (err) {
          callback(null,err);
      } else {
        let jsonArray = []
        rows.forEach(function (columns) {
            var rowObject ={};
            columns.forEach(function(column) {
                rowObject[column.metadata.colName] = column.value;
            });
            jsonArray.push(rowObject)
        });
        callback(jsonArray,null);
      }
    });

    bulks.forEach (function (bulk){
        bulkLoad.addRow(bulk);
        console.log(bulk);
    });

    connection.execBulkLoad(bulkLoad);
  }
};
