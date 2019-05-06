const MongoClient = require('mongodb').MongoClient;

/**
 * Connect to a MongoDB database
 *
 * @param url: MongoDB URL
 * @param dbName: MongoDB database's name
 * @return Db: the connected Mongo database if the connection is successful
 * @return Error: an error if the connection fails
 * */
async function connectDb(url, dbName) {
  const client = new MongoClient(url, { useNewUrlParser: true });

  const res = client
    .connect()
    .then(res => client.db(dbName), err => new Error(err));

  client.close();

  return res;
}

module.exports = connectDb;
