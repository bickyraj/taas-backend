import {SuitEnum} from "./SuitEnum";

export type CardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export class  CardModel {
    private rankMap: { [key: number]: string } = {
        1: 'A',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: 'J',
        12: 'Q',
        13: 'K'
    };

    private readonly id: string;
    private readonly rank: CardRank;
    private readonly suit: SuitEnum;

    constructor(rank: CardRank, suit: SuitEnum) {
        this.id = crypto.randomUUID();
        this.rank = rank;
        this.suit = suit;
    }

    public getId(): string {
        return this.id;
    }

    public getRank(): String {
        return this.rankMap[this.rank] || '';
    }

    public getSuit(): SuitEnum {
        return this.suit;
    }

    public getColor(): 'red' | 'black' {
        if (this.suit === SuitEnum.HEARTS || this.suit === SuitEnum.DIAMONDS) {
            return 'red';
        } else {
            return 'black';
        }
    }
}
