/** ********* /LOGIN ROUTE ********* **/

const express = require('express');
const router = express.Router();
const path = require('path');

const db_functions = require('./mysql');

// Set up route
router.get('/', (req, res, next) => {
    const msg = 'Opening login page';
    console.log(msg);

    res.sendFile('login.html', {root: path.join(__dirname, '../dist')}, (e) => {
        (e) ? next(e) : console.log("Sent 'login.html'");
    });
});

router.post('/createuser', (req, res, next) => {
    db_functions.createUser(req.body.em, req.body.pw, req.app.locals.db_connection_pool).then(
        // Promise fulfilled (user entry successfully created)
        () => {
            console.log(`createUser() success.`);
            res.sendStatus(200);
        },
        // Promise rejected (error encountered)
        () => {
            console.log(`createUser() failed.`);
            res.sendStatus(400);
        }
    );
});

module.exports = router;