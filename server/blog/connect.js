'use strict';

// NOTE: Database variables should be specified in the .env file

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Set up variables
const url = process.env.BLOG_DB_URL;
const dbName = process.env.BLOG_DB_NAME;

// Connect to the server
function connect() {
    MongoClient.connect(url, (err, client) => {
        assert.strictEqual(null, err);
        console.log('Successfully connected to the MongoDB server');

        const db = client.db(dbName);

        client.close();
    });
}

module.exports = {
    connect: connect
};
