/** ********* PASSWORD VALIDATION ********* **/

// Error codes
const errors_dict = {
    0: 'Need a minimum of 7 characters.',
    1: 'Need at least 1 numeral.',
    2: 'Need at least 1 non-numeral.'
};

export default function pwValidation(pw) {
    // Constraints
    const min_length = 7;

    let errors = [];

    // START PASSWORD VALIDATION

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

    // END PASSWORD VALIDATION

    // Return error message strings
    if (errors.length === 0) {
        return ''
    } else {
        let error_msg = '';
        for (let i = 0; i < errors.length; i++) {
            error_msg += `${errors[i]} `;
        }
        return error_msg
    }
}