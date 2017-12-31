/** ********** MYSQL SETUP ********** **/

// This is run when the express app is created

const mysql = require('mysql');
const mysql_config = require('./mysql-config');  // Basic MySQL information
const pool_max_connections = 10;  // Maximum number of connections in the pool

function createConnectionPool() {
    return mysql.createPool({
        connectionLimit: pool_max_connections,
        host: mysql_config.host,
        user: mysql_config.user,
        password: mysql_config.password,
        database: mysql_config.database
    });
}

export default function setupMySQL() {
    return createConnectionPool();
}