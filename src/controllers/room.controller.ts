import {RoomManager} from "../services/room-manager";
import { Request, Response } from "express";

const roomManager = RoomManager.getInstance();

export const getRoom = (req: Request, res: Response) => {
    try {
        const { roomId } = req.params;

        if (!roomId || Array.isArray(roomId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid roomId",
            });
        }

        return res.status(200).json({
            success: true,
            data: roomManager.getRoom(roomId),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get room",
        });
    }
};

export const getRoomPlayers = (req: Request, res: Response) => {
    try {
        const { roomId } = req.params;

        if (!roomId || Array.isArray(roomId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid roomId",
            });
        }

        return res.status(200).json({
            success: true,
            data: roomManager.getRoomPlayer(roomId),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get room",
        });
    }
};