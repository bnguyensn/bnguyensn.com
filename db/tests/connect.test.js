const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const connectDb = require('../connectDb');
const fetchCol = require('../fetchCol');
const deleteAll = require('../deleteAll');
const createEntry = require('../createEntry');
const readEntries = require('../readEntries');
const readEntry = require('../readEntry');
const deleteEntry = require('../deleteEntry');
const createEntries = require('../createEntries');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const colName = process.env.DB_COL_NAME;

describe('Database connection test', () => {
  const client = new MongoClient(url, { useNewUrlParser: true });
  let db, col, mockEntry, mockEntries;

  afterAll(async () => {
    // Delete all entries
    await deleteAll(col);

    // Close database connection
    await client.close();
  });

  it('should connect to the database', async () => {
    db = await connectDb(client, url, dbName);

    expect(db).not.toBe(null);
  });

  it('should fetch a collection', async () => {
    col = await fetchCol(db, colName);

    expect(col instanceof Error).toBe(false);
    expect(col.collectionName).toBe(colName);
  });

  it('should insert an entry to the collection', async () => {
    mockEntry = {
      question: `${Math.random()}`,
      answer: `${Math.random()}`,
      author: `${Math.random()}`,
      date: Date.now(),
    };

    const res = await createEntry(mockEntry, col);

    expect(res instanceof Error).toBe(false);
    expect(res.insertedCount).toBe(1);
  });

  it('should read the previously inserted entry', async () => {
    const res = await readEntry(mockEntry, col);

    expect(res instanceof Error).toBe(false);
    expect(res).toEqual(mockEntry);
  });

  it('should delete the previously inserted entry', async () => {
    const resDel = await deleteEntry(mockEntry, col);
    const resRead = await readEntry(mockEntry, col);

    expect(resDel instanceof Error).toBe(false);
    expect(resDel.deletedCount).toBe(1);
    expect(resRead).toBeNull();
  });

  it('should insert an array of entries to the collection', async () => {
    mockEntries = [];
    for (let i = 0; i < 3; i++) {
      mockEntries.push({
        question: `${Math.random()}`,
        answer: `${Math.random()}`,
        author: `${Math.random()}`,
        date: Date.now(),
      });
    }

    const res = await createEntries(mockEntries, col);

    expect(res instanceof Error).toBe(false);
    expect(res.insertedCount).toBe(3);
  });

  it('should read the previously inserted entry array', async () => {
    const mockEntriesQuestions = mockEntries.map(entry => entry.question);

    const res = await readEntries(
      { question: { $in: mockEntriesQuestions } },
      col,
    );

    expect(res instanceof Error).toBe(false);
    expect(res).toBeArrayOfSize(mockEntries.length);
    res.sort((a, b) => a.date - b.date);
    res.forEach((entry, i) => {
      expect(entry).toEqual(mockEntries[i]);
    });
  });
});
