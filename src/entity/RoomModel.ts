import {PlayerModel} from "./PlayerModel";

export class RoomModel {
    private id: string;
    private players: PlayerModel[];

    constructor(id: string) {
        this.id = id;
        this.players = [];
    }

    public getPlayers(): PlayerModel[] {
        return this.players;
    }

    public addPlayer(player: PlayerModel): void {
        this.players.push(player);
    }
}