import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Open database connection
export async function openDb() {
  return open({
    filename: path.join(__dirname, 'database.sqlite'),
    driver: sqlite3.Database
  });
}

// Initialize tables
export async function initDb() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      price REAL NOT NULL,
      period TEXT,
      bedrooms INTEGER,
      bathrooms REAL,
      area REAL,
      type TEXT,
      propertyType TEXT,
      image TEXT,
      description TEXT,
      isVerified BOOLEAN DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS favorites (
      userId INTEGER,
      propertyId INTEGER,
      PRIMARY KEY (userId, propertyId),
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (propertyId) REFERENCES properties(id)
    );

    CREATE TABLE IF NOT EXISTS comparisons (
      userId INTEGER,
      propertyId INTEGER,
      PRIMARY KEY (userId, propertyId),
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (propertyId) REFERENCES properties(id)
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      propertyId INTEGER NOT NULL,
      userId INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      comment TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (propertyId) REFERENCES properties(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      propertyId INTEGER NOT NULL,
      userId INTEGER,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (propertyId) REFERENCES properties(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);

  console.log("Database initialized with tables.");
  return db;
}
