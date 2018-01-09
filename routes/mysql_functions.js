/** ********** MYSQL MIDDLEWARE ********** **/

// Client side will need to send a GET / POST request to this middleware to access / modify the database

const mysql = require('mysql');

const pw_functions = require('../server/pw/hashPw');

function validateNewUserEntry(em, pw) {
    return true
}

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
    const query = `INSERT INTO users (email)
                   VALUES (?);`;
    const escapedQuery = mysql.format(query, [em]);

    return new Promise((resolve, reject) => {
        queryDatabase(escapedQuery, connection_pool).then(
            // Promise fulfilled
            ([results, fields]) => {
                console.log(`results: ${Object.entries(results)}`);
                console.log(`fields: ${fields}`);
                resolve();
            },
            // Promise rejected
            (err) => {
                console.log(`createNewUserEntry() failed. ${err}`);
                reject();
            }
        );
    })
}

module.exports = {
    createUser: createUser,
    checkEmDuplication: checkEmDuplication
};