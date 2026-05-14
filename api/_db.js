const { MongoClient } = require('mongodb');

const URI = process.env.MONGODB_URI || 'mongodb+srv://Natural-Mystic:Tatamelcho10@cluster0.utkh1aw.mongodb.net/natural-mystic';
const DB_NAME = 'natural-mystic';

let client;
let db;

async function connect() {
  if (db) return db;
  if (!client) {
    client = new MongoClient(URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    await client.connect();
  }
  db = client.db(DB_NAME);
  return db;
}

module.exports = { connect };
