/**
 * Connect to a MongoDB database
 *
 * @param {MongoClient} client: the MongoClient instance
 * @param {string} url: the MongoDB URL
 * @param {string} dbName: the MongoDB database's name
 * @return {Promise}:
 *  onFulfilled {Db}: the connected MongoDB database instance
 *  onRejected {Error}: a MongoError instance
 * */
function connectDb(client, url, dbName) {
  return client
    .connect()
    .then(res => res.db(dbName), err => new Error(err));
}

module.exports = connectDb;
