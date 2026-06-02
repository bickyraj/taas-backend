import Database from 'better-sqlite3';

export const db: Database.Database = new Database('game.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );
`);