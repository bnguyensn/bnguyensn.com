/**
 * Connect to a MongoDB database
 *
 * @param client: the MongoClient instance
 * @param url: the MongoDB URL
 * @param dbName: the MongoDB database's name
 * @return Db: the connected Mongo database if the connection is successful
 * @return Error: an error if the connection fails
 * */
async function connectDb(client, url, dbName) {
  return client
    .connect()
    .then(res => res.db(dbName), err => new Error(err));
}

module.exports = connectDb;
