const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const connectDb = require('../connectDb');
const fetchCol = require('../fetchCol');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const colName = process.env.DB_COL_NAME;

describe('Database connection test', () => {
  const client = new MongoClient(url, { useNewUrlParser: true });
  let db;
  let col;

  test('Connection to database should be successful', async () => {
    db = await connectDb(client, url, dbName);

    expect(db).not.toBe(null);
  });

  test('Collection should be fetched successfully', async () => {
    col = await fetchCol(db, colName);

    expect(col.collectionName).toBe(colName);
  });

  test('Connection to database should be terminated', async () => {
    await client.close();

    expect(client.isConnected()).toBe(false);
  });
});
