/** ********* EMAIL VALIDATION ********* **
 * Email syntax validation (front-end)
 * Standard email format: [local-part]@[domain].[top-level domain]
 *
 * @param {String} em - Email to be validated
 * @return {String} error messages
 */

import {postCheckEmDuplication} from './02_login-network';

const tld_json = require('../json/tld');  // Top-level domain list, to check domain validity
const tld_array = Object.keys(tld_json).map((k) => {return tld_json[k]});  // Convert the above to an array

const errors_dict = {
    10: 'Too many "@".',
    11: 'Too few "@"',
    20: 'Invalid top-level domain.',
    30: 'Invalid domain.',
    40: 'Invalid local-part.',
    50: 'Email already taken.'
};

function checkLocalPart(lp) {
    return lp.length <= 0

    // TODO: add all the special rules for local part
}

function checkDomain(d) {
    return (
        d.length <= 0 ||  // Check if domain length > 0
        /[^a-z\d\-.]/gi.test(d)  // Check if domain follows LDH (letter-digit-hyphen). Dot allowed (cases like .co.uk)
    )
}

function checkSyntax(em, short_error) {
    const short_error_msg = 'Invalid email address.';
    let errors = [];

    // START SYNTAX VALIDATION

    // Count the number of '@' occurrences
    const at_count = (em.match(/@/g) || []).length;

    if (at_count > 1) {
        errors.push(errors_dict[10]);
    } else if (at_count < 1) {
        errors.push(errors_dict[11]);
    } else {
        // There's only 1 "@"
        const at_index = em.indexOf('@');

        // Check if top-level domain / domain is valid
        const dot_last_index = em.lastIndexOf('.');
        if (dot_last_index === -1) {
            // There are no "."
            errors.push(errors_dict[20]);
            errors.push(errors_dict[30]);
        } else {
            // There are some sort of "."

            // Check if the top-level domain index contains this entry
            const top_level_domain = em.slice(dot_last_index + 1).toUpperCase();
            if (!tld_array.includes(top_level_domain)) {
                errors.push(errors_dict[20]);
            }

            // Check if domain syntax is valid
            const domain = em.slice(at_index + 1, dot_last_index);
            if (checkDomain(domain)) {
                errors.push(errors_dict[30]);
            }
        }

        // Check if local-part syntax is valid
        const local_part = em.slice(0, at_index);
        if (checkLocalPart(local_part)) {
            errors.push(errors_dict[40]);
        }
    }

    // END SYNTAX VALIDATION

    // Return error message strings
    if (errors.length === 0) {
        return ''
    } else {
        if (short_error) {
            return short_error_msg
        } else {
            let error_msg = '';
            for (let i = 0; i < errors.length; i++) {
                error_msg += `${errors[i]} `;
            }
            return error_msg
        }
    }
}

function checkDuplication(em) {
    // Make a Promise request to our database server
    return new Promise((resolve, reject) => {
        postCheckEmDuplication(em).then(
            (res) => {
                const resObj = JSON.parse(res);
                const emCount = resObj[0]['count'];
                console.log(`Number of occurrences for ${em}: ${emCount}`);
                if (emCount >= 1) {
                    resolve('Email already in use.');
                }
                resolve('');
            },
            (res) => {
                console.log(res);
                reject('Something went wrong when contacting our server :(.');
            }
        );
    })
}

export default function emValidation(em) {
    // We first check for errors in the email syntax.
    // If there are no email syntax errors, we move on to check email duplication
    // which requires a database request. This is also the only async part of the function.

    return new Promise((resolve, reject) => {
        // If the below is true -> show a short error message for our email syntax check
        // rather than specific ones per the errors_dict. This is helpful when you don't want
        // to show users too detailed errors (may be for security reasons).
        const em_syntax_short_error = true;

        const em_syntax_errors = checkSyntax(em, em_syntax_short_error);
        if (em_syntax_errors === '') {
            // No email syntax errors, let's check if this email already exists in the database.
            checkDuplication(em).then(
                (em_duplication_error) => {
                    if (em_duplication_error === '') {
                        // No duplication error either, this email can be submitted to the database
                        resolve('');
                    } else {
                        resolve(em_duplication_error);
                    }
                },
                (server_error) => {
                    // Promise rejected, something wrong with our request
                    reject(server_error);
                }
            );
        } else {
            // There are email syntax errors, let's flag to fix these first.
            // Since there are no async functions in this case, there's no need to call reject()
            // as the Promise will always resolve().
            resolve(em_syntax_errors);
        }
    })
}