/**
 * Fetch a MongoDB collection
 *
 * @param db: the MongoDB database where the collection is being fetched from
 * @param colName: name of the collection we are fetching
 * @return Collection: a MongoDB Collection if the collection exists
 * @return Error: an error if the collection does not exist
 * */
function fetchCol(db, colName) {
  // The strict option makes the operation returns an error if the collection
  // does not exist. When this is used, a callback must be passed.
  db.collection(colName, { strict: true }, (err, col) => {
    if (err) {
      return err
    }

    return col
  })
}

module.exports = fetchCol;
