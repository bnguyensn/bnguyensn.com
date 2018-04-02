'use strict';

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
        const duplicate_username = await coll.findOne({username: username});

        if (duplicate_username !== null) {
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
 * LOGGING IN
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

        const user_credentials = await coll.findOne({username: username, pwd: pwd});

        if (user_credentials === null) {
            console.log('Username / password pairing not found');
            return new Error('Username / password pairing not found');
        }

        // User's credentials valid, create a signed token
        const payload = {userId: user_credentials._id};  // a.k.a. "claims"
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

module.exports = {
    createUser: createUser,
    login: login
};