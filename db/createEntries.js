/**
 * Create multiple entries in a MongoDB collection
 *
 * @param {Object[]} entries: an array of entry objects to be inserted into the
 * collection
 * @param {Collection} col: the MongoDB collection in question
 * @returns {Promise}:
 *   onFulfilled: {Object} the MongoDB insertWriteOpResult object
 *   onRejected: {Error} a MongoError instance
 * */
function createEntries(entries, col) {
  return col.insertMany(entries).then(res => res, err => err);
}

module.exports = createEntries;
