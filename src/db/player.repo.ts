import {db} from "./db";
import {PlayerModel} from "../entity/PlayerModel";

export class PlayerRepo {
    private static instance: PlayerRepo;

    private constructor() {
    }

    public static getInstance(): PlayerRepo {
        if (!PlayerRepo.instance) {
            PlayerRepo.instance = new PlayerRepo();
        }
        return PlayerRepo.instance;
    }

    createPlayer(player: PlayerModel): void {
        if (this.getPlayerById(player.getId())) {
            console.warn(`Player with id ${player.getId()} already exists. Skipping insertion.`);
            return;
        }
        db.prepare(`
            INSERT INTO players (id, name)
            VALUES (?, ?)
          `).run(player.getId(), player.getName());
        console.log(`Player with id ${player.getId()} created successfully.`);
    }

    getPlayerById(id: string): PlayerModel | null {
        const row = db.prepare(`
            SELECT id, name
            FROM players
            WHERE id = ?
          `).get(id) as any;

        return row ? new PlayerModel(row.id, row.name) : null;
    }

    getPlayersByIds(ids: string[]): PlayerModel[] {
        if (ids.length === 0) {
            return [];
        }
        const placeholders = ids.map(() => '?').join(', ');
        const rows = db.prepare(`
            SELECT id, name
            FROM players
            WHERE id IN (${placeholders})
          `).all(...ids) as any[];

        return rows.map(row => new PlayerModel(row.id, row.name));
    }
}