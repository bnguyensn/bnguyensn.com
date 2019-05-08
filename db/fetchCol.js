/**
 * Fetch a MongoDB collection
 *
 * @param {Db} db: the MongoDB database instance where the collection is being
 * fetched from
 * @param {string} colName: name of the collection we are fetching
 * @return {Promise}
 *   onFulfilled {Collection}: a MongoDB collection
 *   onRejected {Error}: a MongoError instance if the collection doesn't exist
 * */
function fetchCol(db, colName) {
  const p = new Promise((resolve, reject) => {
    // The strict option makes the operation returns an error if the collection
    // does not exist. When this is used, a callback must be passed.
    db.collection(colName, { strict: true }, (err, col) => {
      if (err) {
        reject(err);
      }

      resolve(col);
    });
  });

  return p.then(col => col, err => new Error(err));
}

module.exports = fetchCol;
