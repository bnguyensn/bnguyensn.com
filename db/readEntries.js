/**
 * Read entries from a MongoDB collection based on a query object.
 * Query object specifications can be found in:
 * https://docs.mongodb.com/manual/tutorial/query-documents/
 *
 * @param {object} q: the query object
 * @param {Collection} col: the MongoDB collection in question
 * @returns {Promise}:
 *   onFulfilled {Object[]}: all documents that satisfy the query
 *   onRejected {Error}: a MongoError instance
 * */
function readEntries(q, col) {
  const c = col.find(q);

  return c.toArray().then(res => res, err => err);
}

module.exports = readEntries;
