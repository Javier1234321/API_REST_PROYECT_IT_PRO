import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./catalog.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS plantas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS zombies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT
  )`); 
});

export default db;