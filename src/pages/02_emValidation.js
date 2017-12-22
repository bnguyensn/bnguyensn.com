/** ********* EMAIL VALIDATION ********* **/

/* Rules:
   - format: [local-part]@[domain].[top-level domain]
 */

const tld_json = require('../json/tld');
const tld_array = Object.keys(tld_json).map((k) => {return tld_json[k]});

const errors_dict = {
    0: 'Too many or too few @.',
    1: 'Invalid top-level domain.',
    2: 'Invalid domain.',
    3: 'Invalid local-part.',
    4: 'Email already taken.'
};

function checkLocalPart(lp) {
    return lp.length <= 0

    // TODO: add all the special rules
}

function checkDomain(d) {
    return (
        d.length <= 0 ||  // Check if domain length > 0
        /[^a-z\d\-]/gi.test(d)  // Check if domain follows LDH (letter-digit-hyphen)
    )
}

function checkSyntax(em) {
    let errors = [];

    // Count the number of '@' occurrences
    const at_count = (em.match(/@/g) || []).length;

    if (at_count !== 1) {
        errors.push(errors_dict[0]);
    }

    const at_index = em.indexOf('@');

    // Check if top-level domain is valid
    const dot_last_index = em.lastIndexOf('.');
    const top_level_domain = em.slice(dot_last_index + 1).toUpperCase();

    if (!tld_array.includes(top_level_domain)) {
        errors.push(errors_dict[1]);
    }

    // Check if domain is valid
    const domain = em.slice(at_index + 1, dot_last_index);

    if (checkDomain(domain)) {
        errors.push(errors_dict[2]);
    }

    // Check if local-part is valid
    const local_part = em.slice(0, at_index);

    if (checkLocalPart(local_part)) {
        errors.push(errors_dict[3]);
    }

    /* Congratulations! Email syntax seems valid!  */
    return errors
}

function checkDuplication(em) {
    let errors = [];

    // TODO: query database to check for duplication

    return errors
}

export default function emValidation(em) {
    return checkSyntax(em).concat(checkDuplication(em));
}