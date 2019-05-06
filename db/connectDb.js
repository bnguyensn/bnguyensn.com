/**
 * Connect to a MongoDB database
 *
 * @param client: the MongoClient instance
 * @param url: the MongoDB URL
 * @param dbName: the MongoDB database's name
 * @return Promise:
 *  onFulfilled: return the connected Mongo database
 *  onRejected: return an error
 * */
function connectDb(client, url, dbName) {
  return client
    .connect()
    .then(res => res.db(dbName), err => new Error(err));
}

module.exports = connectDb;
