import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import {db} from "./db/db";
import roomRoutes from "./routes/room.routes";
import {SocketService} from "./services/socket.service";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", roomRoutes);

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "1e562466c6c690",
        pass: "03b4aca9e2cdd7",
    },
});

app.post("/api/send-email", async (req, res) => {
    const {email, body} = req.body;
    await transporter.sendMail({
        from: email,
        to: "bickyrajkayastha@gmail.com",
        subject: "portfolio message",
        text: body,
    });

    res.send("Email sent");
});

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