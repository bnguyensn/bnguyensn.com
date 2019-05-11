/**
 * Read an entry from a MongoDB collection based on a query object.
 * Query object specifications can be found in:
 * https://docs.mongodb.com/manual/tutorial/query-documents/
 *
 * @param {Object} q: the query object
 * @param {Collection} col: the MongoDB collection in question
 * @returns {Promise}:
 *   onFulfilled {Object | null}: a document that satisfy the query, or null if
 *   nothing was found
 *   onRejected {Error}: a MongoError instance
 * */
function readEntry(q, col) {
  return col.findOne(q);
}

module.exports = readEntry;
