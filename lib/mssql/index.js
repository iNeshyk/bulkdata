"use strict";

const Connection = require('tedious').Connection;
const Request    = require('tedious').Request

let pool = require('./pool.js');

let connection;
let request;

module.exports = {
  connectPool: (err, callback) => {
    pool.set();
  },
  reqPool: (query, params, callback) => {
    pool.get().acquire(function (err, connectionPool) {
      if (err) {
          console.error(err);
          return;
      }
      //use the connection as normal
      request = new Request(query, function(err, rowCount, rows) {
        if (err) {
              callback(null,err);
            }else {
              let jsonArray = [];
              rows.forEach(function (columns) {
                  var rowObject ={};
                  columns.forEach(function(column) {
                      rowObject[column.metadata.colName] = column.value;
                  });
                  jsonArray.push(rowObject)
              });
              callback(jsonArray,null);
            }
        connectionPool.release();
      });
      for(let kv in params){
        request.addParameter(kv, TYPES.NVarChar,params[kv]);
      };
      connectionPool.execSql(request);
  });
  },
  connect: (callback) => {
    connection = new Connection(config);
    connection.on('connect', function(err) {
      if(err){
        console.error(err);
      }
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
            let jsonArray = [];
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
    });

    connection.execBulkLoad(bulkLoad);
  }
};
