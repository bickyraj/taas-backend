import {RoomModel} from "../entity/RoomModel";
import {PlayerModel} from "../entity/PlayerModel";

export class RoomManager {
    private static instance: RoomManager;

    private roomsPlayer: Map<string, string[]> = new Map();
    private rooms: Map<string, RoomModel> = new Map();
    private constructor() {}

    public static getInstance(): RoomManager {
        if (!RoomManager.instance) {
            RoomManager.instance = new RoomManager();
        }
        return RoomManager.instance;
    }

    public getOrCreateRoom(roomId: string): RoomModel {
        let room = this.rooms.get(roomId);
        if (!room) {
            const newRoom = new RoomModel(roomId)
            this.rooms.set(roomId, newRoom);
            return newRoom;
        }
        return room;
    }

    public getRoom(roomId: string): RoomModel | undefined {
        return this.rooms.get(roomId);
    }

    public getAllRooms(): RoomModel[] {
        return Array.from(this.rooms.values());
    }

    public addPlayerToRoom(roomId: string,  playerId: string): void {
        if (!this.roomsPlayer.has(roomId)) {
            this.roomsPlayer.set(roomId, []);
        }
        const players = this.roomsPlayer.get(roomId);
        if (players && !players.includes(playerId)) {
            players.push(playerId);
            this.roomsPlayer.set(roomId, players);
        }
    }
}