import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import {RoomManager} from "./services/room-manager";
import {randomUUID} from "node:crypto";
import {RoomModel} from "./entity/RoomModel";
import {PlayerModel} from "./entity/PlayerModel";
import roomRoutes from "./routes/room.routes";
import {PlayerManager} from "./services/player-manager";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", roomRoutes);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // later restrict to Angular URL
        methods: ["GET", "POST"]
    }
});
const roomManager = RoomManager.getInstance();
const playerManager = PlayerManager.getInstance();

io.on("connection", (socket) => {
    const playerId = socket.handshake.auth.playerId;
    playerManager.addPlayer(playerId, socket.id);
    console.log("User connected:", socket.id);

    socket.on("joinRoom", (roomId, playerId ) => {
        socket.join(roomId);
        roomManager.addPlayerToRoom(roomId, playerId);
        io.to(roomId).emit("roomUpdated");
        console.log(`${socket.id} joined room ${roomId}`);
    });

    socket.on('createRoom', (callback) => {
        const roomId = randomUUID();
        roomManager.getOrCreateRoom(roomId);
        socket.join(roomId);
        callback(roomId);
    });

    socket.on('getRoomDetail', (roomId, callback) => {
        callback(roomManager.getRoom(roomId));
    });

    socket.on("disconnect", () => {
        playerManager.removeSocket(socket.id);
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});