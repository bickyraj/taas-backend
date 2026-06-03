import {PlayerModel} from "./PlayerModel";
import {DeckModel} from "../models/DeckModel";
import {SocketService} from "../services/socket.service";

export class RoomModel {
    private id: string;
    private players: PlayerModel[];
    private deck: DeckModel;
    private socketService = SocketService.getInstance();

    constructor(id: string) {
        this.id = id;
        this.players = [];
        this.deck = new DeckModel();
    }

    public getPlayers(): PlayerModel[] {
        return this.players;
    }

    public addPlayer(player: PlayerModel): void {
        this.players.push(player);
    }

    public dealCard(): void {
        console.log('this is it', this.id);
        this.deck.shuffle();
        for (let round = 0; round < 3; round++) {
            for (const player of this.players) {
                const card = this.deck.drawCard();
                if (card == null) return;
                player.hand.push(card);
                this.socketService.dealCardToPlayer(player.getId(), card);
            }
        }
    }
}