import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';
import path from 'path';

const dbPath = path.resolve('./assets/db/db.json');
const adapters = new FileSync(dbPath);
const db = lowdb(adapters);

export default db;