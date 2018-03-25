'use strict';

// NOTE: Database variables should be specified in the .env file

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Set up variables
const url = process.env.BLOG_DB_URL;
const dbName = process.env.BLOG_DB_NAME;

// Connect to the server
function connect() {
    try {
        // Instantiate connection and return database instance
        MongoClient.connect(url, (err, client) => {
            // Throw AssertionError if encounter errors
            assert.strictEqual(null, err);

            // Else return the connection instance
            return client.db(dbName);
        });
    }
    catch (e) {
        // Rethrow errors
        throw e
    }

}

module.exports = {
    connect: connect
};
