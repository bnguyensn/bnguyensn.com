const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const connectDb = require('../connectDb');
const fetchCol = require('../fetchCol');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const colName = process.env.DB_COL_NAME;

async function test() {
  const client = new MongoClient(url, { useNewUrlParser: true });

  // Phase 1

  console.log('Testing phase 1...');

  const db = await connectDb(client, url, dbName);

  if (db instanceof Error) {
    console.log(`Error connecting to db: ${db}`);
    return;
  }
  console.log('Connected to db successfully');

  // Phase 2

  console.log('Testing phase 2...');

  const col = fetchCol(db, colName);

  if (col instanceof Error) {
    console.log('Error fetching collection: collection does not exist');
    return;
  }
  console.log('Successfully fetched collection');

  // Clean up

  await client.close();

  console.log(
    `MongoClient instance closed? ${client.isConnected() ? 'no' : 'yes'}`,
  );
}

test();
