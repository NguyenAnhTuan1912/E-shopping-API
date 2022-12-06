const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
// import lowdb from 'lowdb;';
const path = require('path');
const dbPath = path.resolve('./assets/db/db.json');
const adapters = new FileSync(dbPath);
const db = lowdb(adapters);

module.exports = db;