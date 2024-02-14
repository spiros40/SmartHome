const { MongoClient } = require('mongodb');
//const db = require('./db');

// Connection URI
const uri = 'mongodb://127.0.0.1:27017';

// Create a new MongoClient instance
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to connect to MongoDB
async function connect() {
  try {
    await client.connect();
    console.log('Connected to DB');
  } catch (err) {
    console.error('Error connecting to DB:', err);
    throw err;
  }
}
// Function to close the MongoDB connection
async function close() {
  try {
    await client.close();
    console.log('Connection to DB closed');
  } catch (err) {
    console.error('Error closing DB connection:', err);
    throw err;
  }
}
// update one value to DB
async function updateAValue(dbName,collectionName,myquery,newValue) {
    try {
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      //await collection.updateOne(myquery, newvalue); {$set:{ pass: "one" }}
      await collection.updateOne(myquery, {$set: newValue });
      console.log('Document updated successfully');
      return true;
    } catch (error) {
      console.error('Error while updating document:', error);
      return null;
    }
  };
// find a value to DB
async function findARow(dbName,collectionName,myquery) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.find(myquery).toArray();
    console.log('Document finded successfully');
    return JSON.stringify(result);
  } catch (error) {
    console.error('Error document doesnt finded:', error);
    return null;
  }
};
// enter new row to DB
async function enterARow(dbName,collectionName,newRow) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne(newRow);
    console.log('Row insert successfully');
    return true;
  } catch (error) {
    console.error('Error while inserting Row', error);
    return null;
  }
};
// delete row from DB
async function deleteARow(dbName,collectionName,newRow) {
  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.remove(newRow);
    console.log('Row removed successfully');
    return true;
  } catch (error) {
    console.error('Error while removing Row', error);
    return null;
  }
};

module.exports = {
  connect,
  close,updateAValue,findARow,enterARow,
  deleteARow  
};

