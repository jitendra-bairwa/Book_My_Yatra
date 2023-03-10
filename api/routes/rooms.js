import  express  from "express";
const router = express.Router();

import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js";
import {verifyAdmin} from "../utils/verifyToken.js"



// Create
router.post("/:hotelid", verifyAdmin, createRoom);
  
// UPDATE
router.put("/:id", verifyAdmin, updateRoom)


// DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

// GET
router.get("/:id", getRoom);


// GET ALL HOTELS
router.get("/", getRooms)

export default router;