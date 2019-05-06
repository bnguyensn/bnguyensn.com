const connectDb = require('../connectDb');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

const db = connectDb(url, dbName);

if (db instanceof Error) {
  console.log('Error connecting to db');
}

console.log('Connected to db successfully');
