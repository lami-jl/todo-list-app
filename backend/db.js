const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbDir = path.join(__dirname, '../database');
const dbPath = path.join(dbDir, 'app.sqlite');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log("Cartella 'database' creata automaticamente.");
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Errore durante l'apertura del database:", err.message);
  } else {
    console.log("Connesso al database SQLite.");
  }
});

module.exports = db;