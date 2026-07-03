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

    db.serialize(() => {

      db.run(`
        CREATE TABLE IF NOT EXISTS lists (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (createErr) => {
        if (createErr) {
          console.error("Errore nella creazione della tabella 'lists':", createErr.message);
        } else {
          console.log("Tabella 'lists' verificata/creata con successo.");
        }
      });

      db.run(`
        CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          id_list INTEGER,
          name TEXT NOT NULL,
          stato TEXT DEFAULT 'todo',
          FOREIGN KEY (id_list) REFERENCES lists(id) ON DELETE CASCADE
        )
      `, (itemErr) => {
        if (itemErr) {
          console.error("Errore nella creazione della tabella 'items':", itemErr.message);
        } else {
          console.log("Tabella 'items' verificata/creata con successo.");
        }
      });

    });
  }
});

module.exports = db;