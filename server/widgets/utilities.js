'use strict';

/** utilities =====================================
 * Contains handy functions
 * */

/**
 * Subtract obj2 from obj1.
 * Return a copy of obj1 but with subtracted number properties
 * @param {Object} obj1 - Any object
 * @param {Object} obj2 - Any object
 * @return {Object}
 */
function objSubtract(obj1: {}, obj2: {}): {} {
    let objR = {};
    for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            isNumber(obj1[key]) && isNumber(obj2[key]) ?
                objR[key] = parseFloat(obj1[key]) - parseFloat(obj2[key]) :
                objR[key] = obj1[key];
        }
    }
    return objR
}