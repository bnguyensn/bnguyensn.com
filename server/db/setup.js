/** ********** MYSQL SETUP ********** **/

// This is run when the express app is created

const mysql = require('mysql');
const mysql_cfg = require('./mysql-cfg');  // Basic MySQL information
const pool_max_connections = 10;  // Maximum number of connections in the pool

function createConnectionPool() {
    return mysql.createPool({
        connectionLimit: pool_max_connections,
        host: mysql_cfg.host,
        user: mysql_cfg.user,
        password: mysql_cfg.password,
        database: mysql_cfg.database
    });
}

module.exports = {
    createConnectionPool: createConnectionPool
};