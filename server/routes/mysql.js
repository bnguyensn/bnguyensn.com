/** ********** MYSQL MIDDLEWARE ********** **/

const mysql = require('mysql');
const mysql_cfg = require('../mysql/mysql-cfg');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* ********* BCRYPT FUNCTIONS ********** */

/** Hash a given password string */
function hashPassword(pw) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pw, saltRounds).then(
            (pw_hashed) => { resolve(pw_hashed) },
            (err) => { reject(err) }
        );
    })
}

/** Check if a given password string match a hashed password string */
function checkPassword(pw, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pw, hash).then(
            (res) => { resolve(res) },
            (err) => { reject(err) }
        );
    })
}

/* ********* MYSQL QUERY FUNCTIONS ********** */

function queryDatabase(escapedQuery, connection_pool) {
    return new Promise((resolve, reject) => {
        console.log(`Attempting to get a mysql connection from the pool...`);
        connection_pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                console.log(`Attempting to query database using connection id#${connection.threadId}...`);
                connection.query(escapedQuery, (err, results, fields) => {
                    console.log(`Query finished. Releasing connection.`);
                    connection.release();
                    if (err) {
                        console.log(`Query failed. Error: ${err.code}: ${err}.`);
                        reject(err);
                    } else {
                        console.log(`Query succeed. Returning [results, fields].`);
                        resolve([results, fields]);
                    }
                });
            }
        });
    })
}

function queryCreateUser(em, pw, connection_pool) {
    // Note: the password parameter pw passed here should already be the hashed version
    return new Promise((resolve, reject) => {
        const query_str = `INSERT INTO ${mysql_cfg.tbl_users} (${mysql_cfg.tbl_users_em}, ${mysql_cfg.tbl_users_pw}) 
                           VALUES (?, ?);`;
        const query_param = [em, pw];
        const query = mysql.format(query_str, query_param);

        queryDatabase(query, connection_pool).then(
            ([results, fields]) => {
                console.log(`queryCreateUser() succeed. Results array:`);
                console.log(`results: ${Object.entries(results)}`);
                console.log(`fields: ${fields}`);
                resolve();
            },
            (err) => {
                console.log(`queryCreateUser() failed. ${err}`);
                reject();
            }
        );
    })
}

/* ********* EXPOSED MYSQL FUNCTIONS ********** */

function checkEmDuplication(em, connection_pool) {
    const query = `SELECT email, COUNT(*) as count
                   FROM users 
                   WHERE email=?`;
    const escapedQuery = mysql.format(query, [em]);
    //const escapedQuery = query;

    return new Promise((resolve, reject) => {
        queryDatabase(escapedQuery, connection_pool).then(
            // Promise fulfilled
            ([results, fields]) => {
                console.log(`results typeof: ${typeof results}`);
                console.log(`results entries: ${Object.entries(results)}`);
                console.log(`fields: ${fields}`);
                resolve(results);
            },
            // Promise rejected
            (err) => {
                console.log(`checkEmDuplication() failed. ${err}`);
                reject();
            }
        );
    })
}

function createUser(em, pw, connection_pool) {
    return new Promise((resolve, reject) => {
        hashPassword(pw).then(
            // Password hashed successfully
            (pw_hashed) => {
                queryCreateUser(em, pw_hashed, connection_pool).then(
                    // User created successfully
                    () => { resolve(); },
                    // User failed to be created
                    () => { reject(); }
                );
            },
            // Password failed to hash
            (err) => {
                console.log(`createUser() failed because password failed to hash. ${err}`);
                reject();
            }

        )
    })
}

module.exports = {
    checkEmDuplication: checkEmDuplication,
    createUser: createUser
};