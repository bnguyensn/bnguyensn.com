/**
 * Delete all entries from a collection
 *
 * @param {Collection} col: the MongoDB collection in question
 * @returns {Promise}:
 *   onFulfilled {Object}: the MongoDB deleteWriteOpResult object
 *   onRejected {Error}: a MongoError instance
 * */
function deleteAll(col) {
  return col.deleteMany({})
}

module.exports = deleteAll;
