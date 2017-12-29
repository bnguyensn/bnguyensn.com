/** ********* PASSWORD HASHING LOGIC ********* **/

const bcrypt = require('bcrypt');
// The module will use the value you enter and go through 2^saltRounds iterations of processing
const saltRounds = 10;

/* Note: everything in here is async
   Guidance: https://github.com/kelektiv/node.bcrypt.js
*/

export default function hashPw(pw) {
    bcrypt.hash(pw, saltRounds, (err, hash) => {
        if (err) {
            return false
        }
        return hash
    });
}