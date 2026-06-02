import { Router } from "express";
import {getRoom, getRoomPlayers} from "../controllers/room.controller";

const router = Router();

router.get("/rooms/:roomId", getRoom);
router.get("/room-players/:roomId", getRoomPlayers);

export default router;