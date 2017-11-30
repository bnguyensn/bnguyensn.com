const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    let options = {root: './'};
    let fileName = 'index.html';
    res.sendFile(fileName, options, (e) => {
        if (e) {
            next(e);
        } else {
            console.log(`Sent ${fileName}`);
        }
    });
});


module.exports = router;
