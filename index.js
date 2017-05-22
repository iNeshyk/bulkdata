'use strict';
const db     = require('./lib/mssql');
const server = require('./lib/server');

db.connectPool((err) => {
});

server.run(() => {
});
