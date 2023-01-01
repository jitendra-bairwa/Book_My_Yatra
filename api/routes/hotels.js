import express from "express";
const router = express.Router();

import 
{ createHotel, updateHotel, deleteHotel, getHotel, getHotels } from "../controllers/hotel.js";
import  {verifyAdmin} from "../utils/verifyToken.js";

// Create
router.post("/", verifyAdmin, createHotel);
  
// UPDATE
router.put("/:id", verifyAdmin, updateHotel)


// DELETE
router.delete("/:id", verifyAdmin, deleteHotel)

// GET
router.get("/:id", getHotel);

// GET ALL HOTELS
router.get("/", getHotels)


export default router;