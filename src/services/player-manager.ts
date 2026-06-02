export class PlayerManager {
    private static instance: PlayerManager;
    private playerSocketMap: Map<string, string[]> = new Map();

    private constructor() {
    }

    public static getInstance(): PlayerManager {
        if (!PlayerManager.instance) {
            PlayerManager.instance = new PlayerManager();
        }
        return PlayerManager.instance;
    }

    public addPlayer(playerId: string, socketId: string): void {
        const existingSockets = this.playerSocketMap.get(playerId) || [];
        if (!existingSockets.includes(socketId)) {
            existingSockets.push(socketId);
            this.playerSocketMap.set(playerId, existingSockets);
        }
        console.log(this.playerSocketMap);
    }

    public removeSocket(socketId: string): void {
        for (const [playerId, socketIds] of this.playerSocketMap.entries()) {
            const index = socketIds.indexOf(socketId);
            if (index !== -1) {
                socketIds.splice(index, 1);
                if (socketIds.length === 0) {
                    this.playerSocketMap.delete(playerId);
                } else {
                    this.playerSocketMap.set(playerId, socketIds);
                }
                break;
            }
        }
    }

    public getSocketIds(playerId: string): string[] {
        return this.playerSocketMap.get(playerId) || [];
    }

    public removePlayer(playerId: string): void {
        this.playerSocketMap.delete(playerId);
    }
}