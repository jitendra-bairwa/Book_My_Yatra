import express from "express";
const router = express.Router();

import { updateUser, deleteUser, getUser, getUsers } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


// Checking verifying function
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello user , you are authenticated");
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello user , you logged in and you can delete your account");
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello user , you logged in and you can delete all account ");
// })



// UPDATE
router.put("/:id",verifyUser, updateUser)


// DELETE
router.delete("/:id",verifyUser, deleteUser)

// GET
router.get("/:id",verifyUser, getUser);

// GET ALL HOTELS
router.get("/",verifyAdmin, getUsers)


export default router;