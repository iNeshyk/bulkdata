'use strict';

 var port = process.env.PORT || 8000;

 var http = require('http');
 var express = require('express');
 var bodyParser = require('body-parser');
 var swaggerize = require('swaggerize-express');
 var swaggerUi = require('swaggerize-ui');
 var path = require('path');

 var app = express();

 var server = http.createServer(app);

 const run = function(callback) {
   server.listen(port);
   server.on('error', onError);
   server.on('listening', onListening);
 };

 app.use(bodyParser.json({limit: '100mb'}));

 app.use(swaggerize({
     api: path.resolve('./config/swagger.json'),
     handlers: path.resolve('./handlers'),
     docspath: '/swagger'
 }));

// app.use('/docs', swaggerUi({
//    docs: '/swagger'
// }));

function normalizePort(val) {
   var port = parseInt(val, 10);

   if (isNaN(port)) {
     // named pipe
     return val;
   }

   if (port >= 0) {
     // port number
     return port;
   }

   return false;
 }

 function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

module.exports = {
  run: run
};
