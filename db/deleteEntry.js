/**
 * Delete an entry from a collection based on a query object
 * Query object specifications can be found in:
 * https://docs.mongodb.com/manual/tutorial/query-documents/
 *
 * @param {Object} q: the query object
 * @param {Collection} col: the MongoDB collection in question
 * @returns {Promise}:
 *   onFulfilled {Object}: the MongoDB deleteWriteOpResult object
 *   onRejected {Error}: a MongoError instance
 * */
function deleteEntry(q, col) {
  return col.deleteOne(q);
}

module.exports = deleteEntry;
