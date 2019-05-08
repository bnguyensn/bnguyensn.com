/**
 * Create an entry in a MongoDB collection
 *
 * @param {Object} entry: the entry object to be inserted into the collection
 * @param {Collection} col: the MongoDB collection in question
 * @returns {Promise}:
 *   onFulfilled {Object}: the MongoDB insertOneWriteOpResult object
 *   onRejected {Error}: a MongoError instance
 * */
function createEntry(entry, col) {
  return col.insertOne(entry)
    .then(res => res, err => err);
}

module.exports = createEntry;
