/**
 * Update an entry from a collection based on a query object and an update
 * object
 * Query object specifications can be found in:
 * https://docs.mongodb.com/manual/tutorial/query-documents/
 * Update object specifications can be found in:
 * https://docs.mongodb.com/manual/reference/operator/update/
 *
 * @param {Object} q: the query object
 * @param {Object} u: the update object
 * @param {Collection} col: the MongoDB collection in question
 * @returns {Promise}:
 *   onFulfilled {Object}: the MongoDB updateWriteOpResult object
 *   onRejected {Error}: a MongoError instance
 * */
function updateEntry(q, u, col) {
  return col.updateOne(q, u);
}

module.exports = updateEntry;
