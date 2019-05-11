/**
 * DATABASE TEST
 *
 * Test connection and CRUD operations
 * */

const dotenv = require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const connectDb = require('../connectDb');
const fetchCol = require('../fetchCol');
const deleteAll = require('../deleteAll');
const createEntry = require('../createEntry');
const readEntry = require('../readEntry');
const updateEntry = require('../updateEntry');
const deleteEntry = require('../deleteEntry');
const createEntries = require('../createEntries');
const readEntries = require('../readEntries');
const deleteEntries = require('../deleteEntries');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const colName = process.env.DB_COL_NAME;

function getNewMockEntry() {
  return {
    question: `${Math.random()}`,
    answer: `${Math.random()}`,
    author: `${Math.random()}`,
    date: Date.now(),
  };
}

describe('Database connection test', () => {
  const client = new MongoClient(url, { useNewUrlParser: true });
  let db, col, mockEntry, mockEntries, mockEntryUpdated, mockEntriesUpdated;

  afterAll(async () => {
    // Delete all entries
    await deleteAll(col);

    // Close database connection
    await client.close();
  });

  /** ********** CONNECTION TEST ********** **/

  it('should connect to the database', async () => {
    db = await connectDb(client, url, dbName);

    expect(db).not.toBe(null);
  });

  it('should fetch a collection', async () => {
    col = await fetchCol(db, colName);

    expect(col instanceof Error).toBe(false);
    expect(col.collectionName).toBe(colName);
  });

  /** ********** SINGLE DOCUMENT CRUD TEST ********** **/

  it('should insert an entry to the collection', async () => {
    mockEntry = getNewMockEntry();

    const res = await createEntry(mockEntry, col);

    expect(res instanceof Error).toBe(false);
    expect(res.insertedCount).toBe(1);
  });

  it('should read the previously inserted entry', async () => {
    const res = await readEntry(mockEntry, col);

    expect(res instanceof Error).toBe(false);
    expect(res).toMatchObject(mockEntry);
  });

  it('should update the previously inserted entry', async () => {
    mockEntryUpdated = getNewMockEntry();

    const resUpdate = await updateEntry(
      mockEntry,
      {
        $set: mockEntryUpdated,
      },
      col,
    );

    const [resRead1, resRead2] = await Promise.all([
      readEntry(mockEntry, col),
      readEntry(mockEntryUpdated, col)
    ]);

    expect(resUpdate instanceof Error).toBe(false);
    expect(resRead1).toBeNull();
    expect(resRead2).toMatchObject(mockEntryUpdated);
  });

  it('should delete the previously inserted entry', async () => {
    const resDel = await deleteEntry(mockEntryUpdated, col);
    const resRead = await readEntry(mockEntryUpdated, col);

    expect(resDel instanceof Error).toBe(false);
    expect(resDel.deletedCount).toBe(1);
    expect(resRead).toBeNull();
  });

  /** ********** MULTIPLE DOCUMENTS CRUD TEST ********** **/

  it('should insert an array of entries to the collection', async () => {
    mockEntries = [];
    for (let i = 0; i < 3; i++) {
      mockEntries.push(getNewMockEntry());
    }

    const res = await createEntries(mockEntries, col);

    expect(res instanceof Error).toBe(false);
    expect(res.insertedCount).toBe(3);
  });

  it('should read the previously inserted entries', async () => {
    const mockEntriesQuestions = mockEntries.map(entry => entry.question);

    const res = await readEntries(
      { question: { $in: mockEntriesQuestions } },
      col,
    );

    expect(res instanceof Error).toBe(false);
    expect(res).toBeArrayOfSize(mockEntries.length);
    res.sort((a, b) => a.date - b.date);
    res.forEach((entry, i) => {
      expect(entry).toMatchObject(mockEntries[i]);
    });
  });

  it('should delete the previously inserted entries', async () => {
    const mockEntriesQuestions = mockEntries.map(entry => entry.question);
    const q = { question: { $in: mockEntriesQuestions } };

    const resDel = await deleteEntries(q, col);
    const resRead = await readEntries(q, col);

    expect(resDel instanceof Error).toBe(false);
    expect(resRead).toBeArrayOfSize(0);
  });
});
