'use strict';

/**
 * ERROR-HANDLING MIDDLEWARE
 *
 * Handle errors for our express application
 * */

const express = require('express');
const router = express.Router();
const path = require('path');

/**
 * Catch-all error handler
 * This middleware sits at the bottom of the middleware pack and will be reached after all other paths or errors have been checked
 * It does not have a path specified and hence will be executed for every request to the router
 * */
router.use((err, req, res, next) => {
    // Delegate to express' default error handler when headers have been sent
    if (res.headersSent) {
        return next(err)
    }

    // Send server errors status & end request
    res.sendStatus(500);
});

/**
 * Export the middleware
 * */

module.exports = router;