import {db} from "./db";


export function createPlayer(id: string, name: string) {
    db.prepare(`
    INSERT INTO players (id, name)
    VALUES (?, ?)
  `).run(id, name);
}