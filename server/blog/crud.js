'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const connect = require('./connect');

/**
 * CREATE
 * */

async function createNewPost(col, post_data) {
    try {
        // Connect to the database
        const db = await connect.connect();

        // create Index based on timestamp
        // will only run for first document
        db.collection(col).createIndex({'timestamp': 1});

        // Insert document
        const r = await db.collection(col).insertOne(post_data);

        // Check for errors
        assert.equal(1, r.insertedCount);

        // No errors. Close connection
        db.close();
    }
    catch (e) {
        return e
    }
}

/**
 ** ********** READ **********
 * */

async function retrievePostById(col, post_id) {
    try {
        // Connect to the database
        const db = await connect.connect();

        // Get the first document that matches the query
        const r = await db.collection(col).findOne({_id: post_id});

        // Check for errors
        assert.equal(null, r);

        // No errors. Close connection
        db.close();
    }
    catch (e) {

    }
}

async function retrievePostBetweenDate(col, date_from, date_to) {

}

/**
 * Return a specified number of articles from a specified date. Main use = retrieve x latest articles.
 * @param col - The mongodb collection to search in
 * @param date_from - The timestamp from when the search will commence
 * @param quantity - How many articles to return
 * @return Array - An Array containing the specified articles
 * */
async function retrievePostFromDate(col, date_from, quantity) {
    try {
        // Connect to the database
        const db = await connect.connect();

        // Retrieve a number of documents dated as specified
        const r = [];
        await db.collection(col).find().sort({'timestamp': 1}).limit(quantity).toArray((err, res) => {
            assert.equal(null, err);

            res.forEach((res) => {
                r.append(res);
            });
        });

        // Check for errors
        assert.equal(null, r);

        // No errors. Close connection
        db.close();

        // Return results
        return r
    }
    catch (e) {
        return e
    }
}

/**
 * UPDATE
 * */

async function updatePost(col, post_id, post_update) {
    try {
        // Connect to the database
        const db = await connect.connect();

        // Update document
        const r = await db.collection(col).updateOne({_id: post_id}, {$set: post_update});

        // Check for errors
        assert.equal(1, r.matchedCount);
        assert.equal(1, r.modifiedCount);

        // No errors. Close connection
        db.close();
    }
    catch (e) {
        return e
    }
}

/**
 * DELETE
 * */

async function deletePost(col, post_id, pwd) {
    try {
        // Connect to the database
        const db = await connect.connect();

        // TODO: check password here

        // Delete document
        const r = await db.collection(col).deleteOne({_id: post_id});

        // Check for errors
        assert.equal(1, r.deletedCount);

        // No errors. Close connection
        db.close();
    }
    catch (e) {
        return e
    }
}

module.exports = {
    createNewPost: createNewPost,
    retrievePost: retrievePost,
    updatePost: updatePost,
    deletePost: deletePost
};
