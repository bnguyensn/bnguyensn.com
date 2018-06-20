// @flow

/**
 * @param {Object} obj - The object to check for emptiness
 * @return {boolean} - True if object is empty
 * */
export default function isObjectEmpty(obj: {}): boolean {
    // The obj.constructor === Object check is necessary because
    // Object.keys(new Date()).length = 0
    return Object.keys(obj).length === 0 && obj.constructor === Object
}