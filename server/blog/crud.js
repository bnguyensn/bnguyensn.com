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
 * READ
 * */

async function retrievePost(col, post_id) {
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
