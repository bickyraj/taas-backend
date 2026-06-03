import {Server, Socket} from "socket.io";
import {PlayerModel} from "../models/PlayerModel";
import {randomUUID} from "node:crypto";
import {RoomManager} from "./room-manager";
import {PlayerManager} from "./player-manager";
import {PlayerService} from "./player.service";
import {CardModel} from "../models/CardModel";

export class SocketService {
    private static instance: SocketService;
    private io!: Server;

    private roomManager = RoomManager.getInstance();
    private playerManager = PlayerManager.getInstance();
    private playerService = PlayerService.getInstance();

    private constructor() {
    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public init(io: Server) {
        this.io = io;
    }

    public dealCardToPlayer(playerId: string, card: CardModel) {
        const playerSocketIds = this.playerManager.getSocketIds(playerId);
        for (let socketId of playerSocketIds) {
            this.io.to(socketId).emit('myCardUpdate', card);
        }
    }

    public emitTimerUpdate(roomId: string, timeLeft: number) {
        this.io.to(roomId).emit('timerUpdate', timeLeft);
    }

    public emitCountDownFinished(roomId: string) {
        this.io.to(roomId).emit('countdownFinished');
        const room = this.roomManager.getRoom(roomId)
        if (!room) {
            console.error("Room not found:", roomId);
            return;
        }
        room.dealCard();
        console.log("Starting game in room:", roomId);
    }

    public registerEvents() {
        this.io.on("connection", (socket: Socket) => {
            const playerId = socket.handshake.auth.playerId;
            const name = socket.handshake.auth.name;
            this.playerManager.addPlayer(playerId, socket.id);
            // insert to database
            const playerModel = new PlayerModel(playerId, name);
            this.playerService.insertPlayer(playerModel);
            console.log("User connected:", socket.id);

            socket.on("joinRoom", (roomId, playerId ) => {
                socket.join(roomId);
                this.roomManager.addPlayerToRoom(roomId, playerId);
                const room = this.roomManager.getRoom(roomId);
                this.io.to(roomId).emit("roomUpdated");
                if (room && room.getPlayers().length > 1) {
                    if (room.getGameStart()) return;
                    room.setGameStart(true);
                    this.io.to(roomId).emit('readyToStart');
                    room.startGameCountdown();
                }
            });

            socket.on("broadcastShowCard", (roomId, playerId) => {
                const room = this.roomManager.getRoom(roomId);
                if (room == null) return;
                const player = room.getPlayers().find(p => p.getId() == playerId);
                if (player == null) return;
                this.io.to(roomId).emit('onPlayerShowCardCall', player);
            });

            socket.on('createRoom', (callback) => {
                const roomId = randomUUID();
                this.roomManager.getOrCreateRoom(roomId);
                socket.join(roomId);
                callback(roomId);
            });

            socket.on('getRoomDetail', (roomId, callback) => {
                callback(this.roomManager.getRoom(roomId));
            });

            socket.on("disconnect", () => {
                this.playerManager.removeSocket(socket.id);
                console.log("User disconnected:", socket.id);
            });
        });
    }
}