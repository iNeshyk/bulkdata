'use strict';
const db     = require('./lib/mssql');
const server = require('./lib/server');

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
    server.run(() => {
    });
  }
});
