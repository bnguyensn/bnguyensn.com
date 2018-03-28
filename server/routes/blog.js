'use strict';

/** ********* BLOG ROUTE ********* **/

/**
 * This route connects the client and the server handling blogging operations
 * It is expected that the host which http requests will go through is blog.bnguyensn.com
 * */

const express = require('express');
const router = express.Router();
const assert = require('assert');
const path = require('path');
const blog = require('../blog/crud');

const art_col = 'articles';  // Name of the mongodb collection for blog articles

/** ********** CRUD OPERATIONS ********** **/

/**
 * CREATE
 * */
router.post('createnewpost', (req, res, next) => {
    const post_obj = req.body.post_obj;
    const r = blog.createNewPost(art_col, post_obj);
    if (assert.equal(null, r)) {
        res.sendStatus(200);
    } else {
        res.status(400).send(r);
        next();
    }
});
