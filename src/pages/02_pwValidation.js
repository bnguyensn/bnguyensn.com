/** ********* PASSWORD VALIDATION ********* **/

export default function pwValidation(pw) {
    // Constraints
    const minLength = 7;

    // Error codes
    const errorsDict = {
       0: 'Please enter a minimum of 7 characters.',
       1: 'Please enter at least 1 numeral.',
       2: 'Please enter at least 1 non-numeral.'
    };

    /* Check errors */
    let errors = [];

    // Check length
    if (pw.length < minLength) {
        errors.push(errorsDict[0]);
    }

    // Check numeral
    if (!/\d/.test(pw)) {
        errors.push(errorsDict[1]);
    }

    // Check letter
    if (!/\D/.test(pw)) {
        errors.push(errorsDict[2]);
    }

    return errors
}

