'use strict';

/**
 * Handle user management
 * */

const connect = require('../connect');

const DB_NAME = 'dev_blog_users';
const COLL_NAME = 'users';
const AUTH_OPT = {
    AUTH_SRC: process.env.BLOG_DB_AUTH_SRC,
    AUTH_PWD: process.env.BLOG_DB_USR_ADMIN_PWD,
    AUTH_USR: process.env.BLOG_DB_USR_ADMIN
};

async function createUser(username, pwd) {
    try {
        const db = await connect.connect(DB_NAME, AUTH_OPT);

        if (db instanceof Error) {
            return db
        }
        
        const coll = db.collection(COLL_NAME);
        
        // Check for duplicate
        coll.findOne({username: username}, (err, r) => {
            if (err !== null) {
                console.log('Error in findOne()');
                db.close();
                return err
            }

            if (r !== null) {
                // Duplicate found, return error
                console.log('Username already exists');
                db.close();
                return new Error('Username already exists.')
            }
        });

        // Add user if no duplicate
        coll.insertOne({username: username, pwd: pwd}, (err, r) => {
            if (err !== null) {
                console.log('Error in insertOne()');
                db.close();
                return err
            }
            console.log(`Inserted ${username} as ID ${r.insertedId}`);
            db.close();
            return `Inserted ${username} as ID ${r.insertedId}`
        });
    }
    catch (e) {
        console.log(`Error: ${e.message}`);
        return e
    }
}

module.exports = {
    createUser: createUser
};