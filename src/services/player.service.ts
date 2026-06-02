import {PlayerModel} from "../entity/PlayerModel";
import {PlayerRepo} from "../db/player.repo";

export class PlayerService {
    private static instance: PlayerService;
    private playerRepo = PlayerRepo.getInstance();

    private constructor() {
    }

    public static getInstance(): PlayerService {
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }

    public insertPlayer(player: PlayerModel): void {
        this.playerRepo.createPlayer(player);
    }

    public getPlayersByIds(playerIds: string[]): PlayerModel[] {
        return this.playerRepo.getPlayersByIds(playerIds);
    }
}