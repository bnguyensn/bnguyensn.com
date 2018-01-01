/** ********** MYSQL MIDDLEWARE ********** **/

// Client side will need to send a GET / POST request to this middleware to access / modify the database

const mysql = require('mysql');
const mysql_config = require('../server/db/mysql-config');

const pw_functions = require('../server/pw/hashPw');

function validateNewUserEntry(em, pw) {
    return true
}

const new_user_query = `INSERT INTO users (email)
                            VALUES (?);`;

function createNewUserEntry(em, pw, connection_pool) {
    return new Promise((resolve, reject) => {
        console.log(`Attempting to getConnection (mysql): ${connection_pool}`);
        connection_pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                console.log(`Attempting to query (mysql)`);
                connection.query(mysql.format(new_user_query, em), (err, results, fields) => {
                    console.log(`Releasing connection.`);
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve([results, fields]);
                    }
                });
            }
        });
    })
}

function createUser(em, pw, connection_pool) {
    return new Promise((resolve, reject) => {
        createNewUserEntry(em, pw, connection_pool).then(
            // Promise fulfilled
            ([results, fields]) => {
                console.log(`results: ${results}`);
                console.log(`fields: ${fields}`);
                resolve();
            },
            // Promise rejected
            (err) => {
                console.log(`createNewUserEntry() failed. Error: ${err.code}: ${err}`);
                reject();
            }
        );
    })
}

module.exports = {
    createUser: createUser
};