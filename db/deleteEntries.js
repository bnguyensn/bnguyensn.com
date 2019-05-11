/**
 * Delete multiple entries from a collection based on a query object
 * Query object specifications can be found in:
 * https://docs.mongodb.com/manual/tutorial/query-documents/
 *
 * @param {Object} q: the query object
 * @param {Collection} col: the MongoDB collection in question
 * @returns {Promise}:
 *   onFulfilled {Object}: the MongoDB deleteWriteOpResult object
 *   onRejected {Error}: a MongoError instance
 * */
function deleteAll(q, col) {
  return col.deleteMany(q);
}

module.exports = deleteAll;
