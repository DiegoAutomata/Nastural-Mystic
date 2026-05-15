const { MongoClient } = require('mongodb');

const URI = process.env.MONGODB_URI || '';
const DB_NAME = 'natural-mystic';

let client;

async function connect() {
  if (client) {
    try {
      // Check if connection is still alive
      await client.db(DB_NAME).command({ ping: 1 });
      return client.db(DB_NAME);
    } catch {
      // Connection dead, reconnect
      await client.close(true).catch(() => {});
      client = null;
    }
  }
  
  client = new MongoClient(URI, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  });
  await client.connect();
  return client.db(DB_NAME);
}

module.exports = { connect };
