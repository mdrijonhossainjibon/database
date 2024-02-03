// database.js
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class Database {
  constructor(databasePath) {
    this.databasePath = databasePath;
    this.collections = {};
  }

  loadDatabase(collectionName) {
    const filePath = `${this.databasePath}/${collectionName}.json`;
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsedData = JSON.parse(data);
      this.collections[collectionName] = parsedData || [];
    } catch (error) {
      this.collections[collectionName] = [];
    }
  }

  saveDatabase(collectionName) {
    const filePath = `${this.databasePath}/${collectionName}.json`;
    const collection = this.getCollection(collectionName);
    fs.writeFileSync(filePath, JSON.stringify(collection, null, 2), 'utf-8');
  }

  getCollection(collectionName) {
    if (!(collectionName in this.collections)) {
      this.loadDatabase(collectionName);
    }
    return this.collections[collectionName];
  }

  addToCollection(collectionName, data) {
    const collection = this.getCollection(collectionName);
    const id = uuidv4(); // Generate a random ID
    const document = { _id: id, ...data };
    collection.push(document);
    this.appendToFile(collectionName);
    return document;
  }

  updateCollectionItem(collectionName, id, newData) {
    const collection = this.getCollection(collectionName);
    const index = collection.findIndex(item => item._id === id);

    if (index !== -1) {
      collection[index] = { ...collection[index], ...newData };
      this.appendToFile(collectionName);
      return collection[index];
    }

    return null;
  }

  appendToFile(collectionName) {
    const filePath = `${this.databasePath}/${collectionName}.json`;
    const collection = this.getCollection(collectionName);
    fs.writeFileSync(filePath, JSON.stringify(collection, null, 2), 'utf-8');
  }

  findById(collectionName, id) {
    const collection = this.getCollection(collectionName);
    return collection.find(item => item._id === id);
  }

  // Add your other methods here...

  matchesQuery(item, query) {
    for (const key in query) {
      if (item[key] !== query[key]) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Database;
