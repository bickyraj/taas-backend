import {RoomModel} from "../models/RoomModel";
import {PlayerModel} from "../models/PlayerModel";
import {PlayerService} from "./player.service";

export class RoomManager {
    private static instance: RoomManager;
    private playerService = PlayerService.getInstance();

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

    public getRoomPlayer(roomId: string): PlayerModel [] {
        const playerIds: string[] =  this.roomsPlayer.get(roomId) || [];
        if (playerIds.length === 0) {
            return [];
        }
        return this.playerService.getPlayersByIds(playerIds);
    }

    public getAllRooms(): RoomModel[] {
        return Array.from(this.rooms.values());
    }

    public addPlayerToRoom(roomId: string,  playerId: string): void {
        if (!this.roomsPlayer.has(roomId)) {
            this.roomsPlayer.set(roomId, []);
        }
        const players = this.roomsPlayer.get(roomId);
        const room = this.rooms.get(roomId);
        if (!room) {
            console.error("Room not found:", roomId);
            return;
        }
        if (players && !players.includes(playerId)) {
            room.addPlayer(new PlayerModel(playerId, ""));
            players.push(playerId);
            this.roomsPlayer.set(roomId, players);
        }
    }
}