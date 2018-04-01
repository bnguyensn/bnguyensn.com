'use strict';

/**
 * Handle mongoDB connection
 * NOTE: Important database variables should be specified in the .env file
 * */

const MongoClient = require('mongodb').MongoClient;

const base_URI = process.env.BLOG_DB_BASE_URI;
const host = process.env.BLOG_DB_HOST;
const port = process.env.BLOG_DB_PORT;
const authSrc = process.env.BLOG_DB_AUTH_SRC;

async function connect(db_name, auth_opt) {
    try {
        // Instantiate connection and return database instance
        const connection_URI = `${base_URI}${auth_opt.AUTH_USR}:${auth_opt.AUTH_PWD}@${host}:${port}/
        ${db_name}?authSource=${authSrc}`;

        console.log(connection_URI);

        const r = await MongoClient.connect(connection_URI);
        console.log(`Successfully connected to mongodb ${db_name}`);
        return r.db(db_name)
    }
    catch (e) {
        console.log(`Error when connecting to mongodb: ${e.message}`);
        return e
    }
}

module.exports = {
    connect: connect
};
