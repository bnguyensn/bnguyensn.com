'use strict';
/**
 * Return a random number between 2 given numbers
 * @param {number} a - Any number
 * @param {number} b - Any number
 * @return {number} - A random number between a and b
 */
export default function getRandomNumberBetween(a, b) {
    if (!isNaN(a) && !isNaN(b)) {
        if (b >= a) {
            return a + Math.random() * (b - a);
        }
        return b + Math.random() * (a - b);
    }
    throw new TypeError('Passed parameters are not numbers.');
}
