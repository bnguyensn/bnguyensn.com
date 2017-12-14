const express = require('express');
const router = express.Router();
const path = require('path');

// Test middleware
router.use((req, res, next) => {
    console.log(`Received ${req.method} request`);
    next();
});

// Set up index route
router.get('/', (req, res, next) => {
    // It seems that we do not need any of these for now...Because our homepage is called 'index.html'
    const options = {
        // The folder where production files are
        root: path.join(__dirname, '../dist')
    };

    // Name of index.html
    const fileName = 'index.html';

    /*res.sendFile(fileName, options, (e) => {
        (e) ? next(e) : console.log(`Sent ${fileName}`);
    });*/
});

// Set up test route
router.get('/test', (req, res, next) => {
    console.log('Test route achieved');
    res.redirect('https://google.com');
});

// CHAT
router.get('/chat', (req, res, next) => {
    const msg = 'Opening chat page';
    console.log(msg);
    res.send(msg);
});

module.exports = router;