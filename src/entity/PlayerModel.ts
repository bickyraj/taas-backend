export class PlayerModel {
    private id: string;
    private name: string;


    constructor(id: string, name: string) {
        this.id = id;
        this.name = name; // this is just for testing
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
}