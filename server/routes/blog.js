'use strict';

/** ********* BLOG MIDDLEWARE ********* **/

const express = require('express');
const router = express.Router();
const assert = require('assert');
const path = require('path');

const date_methods = require('../_helpers/date-methods');

const blog = require('../blog/crud');
const users = require('../blog/authentication/users');

const COLLECTION_ARTICLES = 'articles';  // Name of the mongodb collection for blog articles

/** ********** AUTHENTICATION ********** **/

/**
 * Check if a token exists to verify user's credentials
 * */
router.use((req, res, next) => {
    next();
});

/**
 * Check user's login token
 * */
router.get('/api/logintoken', async (req, res, next) => {
    const tokenValid = await users.loginToken(req.signedCookies.logininfo);
    console.log(`signedCookie logininfo = ${req.signedCookies.logininfo}`);

    if (tokenValid instanceof Error) {
        res.status(400).send(tokenValid.message);
    } else {
        res.status(200).send(tokenValid);
    }

    next();
});

/**
 * Check user's credentials
 * */
router.post('/api/login', async (req, res, next) => {
    const token = await users.login(req.body.username, req.body.pwd);

    if (token instanceof Error) {
        res.status(400).send(token.message);
    } else {

        // If storing token using WebStorage, no need to do anything here.
        // The token is sent back to the client and is handled there

        // Storing token using cookie
        res.cookie('logininfo', token, {

            path: 'blog/api/logintoken',
            maxAge: date_methods.daysToMs(30),
            httpOnly: true,
            //secure: true,
            signed: true
        });

        res.status(200).send('Token stored in cookie');
    }

    next();
});

/**
 * Clear cookies
 * */
router.get('/api/clearlogincookies', (req, res, next) => {
    res.clearCookie('logininfo', {
        path: 'blog/api/logintoken',
        httpOnly: true,
        //secure: true,
        signed: true
    });

    res.status(200).send('All cookies cleared');

    next();
});

/** ********** VIEWS ********** **/

router.get('/', (req, res, next) => {
    res.sendFile('blog.html', {
        root: path.join(__dirname, '../../dist'),
        maxAge: 31536000
    }, (e) => {
        (e) ? next(e) : console.log('Successfully sent html');
    });
});

/** ********** DATABASE OPERATIONS (USERS MANAGEMENT) ********** **/

/**
 * Create a new user
 * */
router.post('/api/signup', async (req, res, next) => {
    const insertedUser = await users.createUser(req.body.username, req.body.pwd);

    if (insertedUser instanceof Error) {
        res.status(400).send(insertedUser.message);
    } else {
        // inserted_user, if sent by itself, will be an object like this: {ok: 1, n: 1}
        res.status(200).send(insertedUser.insertedId);
    }
    next();
});

/** ********** DATABASE OPERATIONS (ARTICLES MANAGEMENT) ********** **/

/**
 * CREATE
 * */
router.post('createnewpost', (req, res, next) => {
    const post_obj = req.body.post_obj;
    const r = blog.createNewPost(COLLECTION_ARTICLES, post_obj);
    if (assert.equal(null, r)) {
        res.sendStatus(200);
    } else {
        res.status(400).send(r);
        next();
    }
});

/**
 * READ
 * */
//TODO: should be a GET request - use URL parameters

/**
 * UPDATE
 * */
router.post('updatepost', (req, res, next) => {
    const post_id = req.body.post_id;
    const update_obj = req.body.update_obj;

    const r = blog.updatePost(COLLECTION_ARTICLES, post_id, update_obj);
    if (assert.equal(null, r)) {
        res.sendStatus(200);
    } else {
        res.status(400).send(r);
        next();
    }
});

/**
 * DELETE
 * */
router.post('deletepost', (req, res, next) => {
    const post_id = req.body.post_id;
    const pwd = req.body.pwd;

    const r = blog.deletePost(COLLECTION_ARTICLES, post_id, pwd);
    if (assert.equal(null, r)) {
        res.sendStatus(200);
    } else {
        res.status(400).send(r);
        next();
    }
});

/**
 * Export the middleware
 * */

module.exports = router;