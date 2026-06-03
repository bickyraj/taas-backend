import { CardModel } from './CardModel';
import {SuitEnum} from "./SuitEnum";

export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export class DeckModel {
    private readonly deck: CardModel[] = [];
    private readonly cards: Rank[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    constructor() {
        this.initDeck();
    }

    private initDeck(): void {
        for (const suit of Object.values(SuitEnum)) {
            for (const rank of this.cards) {
                this.deck.push(new CardModel(rank, suit));
            }
        }
    }

    resetDeck(): void {
        this.deck.length = 0;
        this.initDeck();
    }

    getDeck(): CardModel[] {
        return this.deck;
    }

    drawCard(): CardModel | null {
        if (this.deck.length === 0) {
            return null;
        }
        return this.deck.pop() ?? null;
    }
}
