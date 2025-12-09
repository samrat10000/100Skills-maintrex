import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import ClubAdmin from "../models/ClubAdmin.js"
import {registerAdmin , loginadmin } from "../controllers/authController.js"

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login" , loginadmin);

export default router;