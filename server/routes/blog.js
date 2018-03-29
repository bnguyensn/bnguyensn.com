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

const COLLECTION_ARTICLES = 'articles';  // Name of the mongodb collection for blog articles

/** ********** CRUD OPERATIONS ********** **/

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