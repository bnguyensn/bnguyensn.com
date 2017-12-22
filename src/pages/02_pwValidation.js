/** ********* PASSWORD VALIDATION ********* **/

// Error codes
const errors_dict = {
    0: 'Please enter a minimum of 7 characters.',
    1: 'Please enter at least 1 numeral.',
    2: 'Please enter at least 1 non-numeral.'
};

export default function pwValidation(pw) {
    // Constraints
    const min_length = 7;

    /* Check errors */
    let errors = [];

    // Check length
    if (pw.length < min_length && pw.length > 0) {
        errors.push(errors_dict[0]);
    }

    // Check numeral
    if (!/\d/.test(pw)) {
        errors.push(errors_dict[1]);
    }

    // Check letter
    if (!/\D/.test(pw)) {
        errors.push(errors_dict[2]);
    }

    return errors
}

