const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const connectDb = require('../connectDb');
const fetchCol = require('../fetchCol');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const colName = process.env.DB_COL_NAME;

async function cleanUp(client) {
  await client.close();

  console.log(
    `MongoClient instance closed? ${client.isConnected() ? 'no' : 'yes'}`,
  );
}

async function test() {
  const client = new MongoClient(url, { useNewUrlParser: true });

  /** ********** PHASE 1 ********** **/

  console.log('Testing phase 1...');

  const db = await connectDb(client, url, dbName);

  if (db instanceof Error) {
    console.log(`Error connecting to db: ${db}`);
    cleanUp(client);
    return;
  }

  console.log('Connected to db successfully');

  /** ********** PHASE 2 ********** **/

  console.log('Testing phase 2...');

  const col = await fetchCol(db, colName);

  if (col instanceof Error) {
    console.log(`Error fetching collection: ${col}`);
    cleanUp(client);
    return;
  }

  console.log(
    `Collection fetched successfully. Fetched collection name: ${
      col.collectionName
    }`,
  );

  /** ********** CLEAN UP ********** **/

  cleanUp(client);
}

test();
