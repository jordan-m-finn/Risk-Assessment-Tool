import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('your_database.db');

// Create users table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      address TEXT NOT NULL,
      telegram_id INTEGER NOT NULL
    )
  `);
});

export default db;