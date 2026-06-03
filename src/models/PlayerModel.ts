import {CardModel} from "./CardModel";

export class PlayerModel {
    private id: string;
    private name: string;
    private cards: CardModel[];
    public hand: CardModel[];


    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.cards = [];
        this.hand = [];
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
}