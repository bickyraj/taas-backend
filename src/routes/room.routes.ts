import { Router } from "express";
import { getRoom } from "../controllers/room.controller";

const router = Router();

router.get("/rooms/:roomId", getRoom);

export default router;