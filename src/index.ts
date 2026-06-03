import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import {db} from "./db/db";
import roomRoutes from "./routes/room.routes";
import {SocketService} from "./services/socket.service";

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
const socketService = SocketService.getInstance();
socketService.init(io);
socketService.registerEvents();

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});