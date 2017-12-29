/** ********* /LOGIN ROUTE ********* **/

const express = require('express');
const router = express.Router();
const path = require('path');

import {createUser} from './mysql';

// Set up route
router.get('/', (req, res, next) => {
    const msg = 'Opening login page';
    console.log(msg);

    res.sendFile('login.html', {root: path.join(__dirname, '../dist')}, (e) => {
        (e) ? next(e) : console.log("Sent 'login.html'");
    });
});

router.post('/createuser', (req, res, next) => {
    createUser(req.body.em, req.body.pw);
});

module.exports = router;