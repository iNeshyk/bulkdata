const ConnectionPool = require('tedious-connection-pool');
const poolConfig = require('./poolconfig.json');
const config = require('./dbconfig.json');

let pool;

module.exports = {
  set:  () => {
    pool = new ConnectionPool(poolConfig, config);
    pool.on('error', function(err) {
        console.error(err);
    });
    return pool;
  },
  get: () => {
    return pool;
  }
};
