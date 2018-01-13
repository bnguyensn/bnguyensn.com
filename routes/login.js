/** ********* /LOGIN ROUTE ********* **/

const express = require('express');
const router = express.Router();
const path = require('path');

/** Contains our app server's database functions */
const db_functions = require('./mysql');

/** Set up root route */
router.get('/', (req, res, next) => {
    const msg = 'Opening login page';
    console.log(msg);

    res.sendFile('login.html', {root: path.join(__dirname, '../dist')}, (e) => {
        (e) ? next(e) : console.log("Sent 'login.html'");
    });
});

/** Set up route to check the database for email duplication */
router.post('/api/checkemduplication', (req, res, next) => {
    db_functions.checkEmDuplication(req.body.em, req.app.locals.db_connection_pool).then(
        (results) => {
            // NOTE: results is expected to be an Array i.e. res.send() will send over a JSON string.
            res.status(200).send(results);
        },
        () => {
            res.sendStatus(400);
        }
    )
    .catch(next);
});

/** Set up route to create a new user in the database */
router.post('/api/createuser', (req, res, next) => {
    db_functions.createUser(req.body.em, req.body.pw, req.app.locals.db_connection_pool).then(
        () => {
            res.sendStatus(200);
        },
        () => {
            res.sendStatus(400);
        }
    )
    .catch(next);
});

module.exports = router;