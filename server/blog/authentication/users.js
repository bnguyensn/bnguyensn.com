'use strict';

const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');

const connect = require('../connect');

const DB_NAME = 'dev_blog_users';
const COLL_NAME = 'users';
const AUTH_OPT = {
    AUTH_SRC: process.env.BLOG_DB_AUTH_SRC,
    AUTH_PWD: process.env.BLOG_DB_USR_ADMIN_PWD,
    AUTH_USR: process.env.BLOG_DB_USR_ADMIN
};
const JWT_SECRET = process.env.BLOG_DB_JWT_SECRET;

async function createUser(username, pwd) {
    const client = await connect.connect(DB_NAME, AUTH_OPT);

    // Check for errors during connection
    if (client instanceof Error) {
        return client
    }

    const db = client.db(DB_NAME);

    try {
        const coll = db.collection(COLL_NAME);
        
        // Check for duplicate user
        const duplicateUsername = await coll.findOne({username: username});

        if (duplicateUsername !== null) {
            console.log('Username already exists');
            return new Error('Username already exists')
        }

        // Add user if no duplicate
        return await coll.insertOne({username: username, pwd: pwd});
    }
    catch (e) {
        return e
    }
    finally {
        client.close(true);
        console.log('mongodb connection closed');
    }
}

/**
 * LOG IN
 * */

async function login(username, pwd) {
    const client = await connect.connect(DB_NAME, AUTH_OPT);

    // Check for errors during connection
    if (client instanceof Error) {
        return client
    }

    const db = client.db(DB_NAME);

    try {
        const coll = db.collection(COLL_NAME);

        const userCredentials = await coll.findOne({username: username, pwd: pwd});

        if (userCredentials === null) {
            console.log('Username / password pairing not found');
            return new Error('Username / password pairing not found');
        }

        // User's credentials valid, create a signed token
        const payload = {userId: userCredentials._id};  // a.k.a. "claims"
        return jwt.sign(payload, JWT_SECRET, {algorithm: 'HS256', expiresIn: '30d'})
    }
    catch (e) {
        return e
    }
    finally {
        client.close(true);
        console.log('mongodb connection closed');
    }
}

async function loginToken(token) {
    const client = await connect.connect(DB_NAME, AUTH_OPT);

    // Check for errors during connection
    if (client instanceof Error) {
        return client
    }

    const db = client.db(DB_NAME);

    try {

        // Decode token & verify signature
        const decoded_userId = jwt.verify(token, JWT_SECRET).userId;

        // Check if user exists
        const coll = db.collection(COLL_NAME);

        const user_exist = await coll.findOne({_id: ObjectId(decoded_userId)});

        if (user_exist === null) {
            console.log('Invalid token: user not found');
            return new Error('Invalid token: user not found');
        }

        return true
    }
    catch (e) {
        return e
    }
    finally {
        client.close(true);
        console.log('mongodb connection closed');
    }
}

/**
 * EXPORTS
 * */

module.exports = {
    createUser: createUser,
    login: login,
    loginToken: loginToken
};