/** ********* PASSWORD RE-ENTER VALIDATION ********* **/

// Error codes
const errors_dict = {
    0: 'Re-entered password does not match.'
};

export default function pwReValidation(pwRe, pw) {
    /* Check errors */
    let errors = [];

    // Check
    if (pwRe !== pw) {
        errors.push(errors_dict[0]);
    }

    return errors
}