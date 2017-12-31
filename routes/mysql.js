/** ********** MYSQL MIDDLEWARE ********** **/

// Client side will need to send a GET / POST request to this middleware to access / modify the database

const mysql = require('mysql');
const mysql_config = require('../server/db/mysql-config');

import hashPw from '../server/pw/hashPw';

function validateNewUserEntry(em, pw) {
    return true
}

const createNewUserQuery = `INSERT INTO `;

function createNewUserEntry(em, pw, connection_pool) {
    return new Promise((resolve, reject) => {
        connection_pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.connect((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        connection.query('', (err, results, fields) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
                            }
                        })
                    }
                });
            }
        });
    })
}

export function createUser(em, pw, connection_pool) {
    return new Promise((resolve, reject) => {
        // TODO: resolve + reject
        createNewUserEntry(em, pw, connection_pool).then(
            // Promise fulfilled
            () => {

            },
            // Promise rejected
            () => {}
        );
    })
}