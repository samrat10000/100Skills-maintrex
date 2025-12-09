// controllers/headAdminAuth.js
import ClubAdmin from "../models/ClubAdmin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import HeadAdmin from "../models/HeadAdmin.js";

dotenv.config();

export const registerHeadAdmin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const existing = await HeadAdmin.findOne({ userId });
    if (existing) return res.status(400).json({ message: "Head admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new HeadAdmin({ userId, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: "Head admin registered" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginHeadAdmin = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const user = await HeadAdmin.findOne({ userId });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: "headadmin" }, process.env.JWT_SECRET, { expiresIn: "2h" });

    res.json({ token, user: { id: user._id, userId: user.userId, role: "headadmin" } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//! ALL ACTIONS OF HEAD ADMIN 


// GET /api/headadmin/clubs
export const getAllClubs = async (req, res) => {
  try {
    const clubs = await ClubAdmin.find();
    res.status(200).json(clubs);
  } catch (error) {

    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/headadmin/clubs
export const registerNewClub = async (req, res) => {
  const {clubName, userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ error: "User ID and password are required" });
  }

  try {
    const existing = await ClubAdmin.findOne({ userId });
    if (existing) {
      return res.status(409).json({ error: "Club with this user ID already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newClubAdmin = new ClubAdmin({
        clubName,
      userId,
      password: hashedPassword,
    });

    await newClubAdmin.save();
    res.status(201).json({ message: "Club admin registered successfully" });
  } catch (error) {

    res.status(500).json({ error: "Internal server error" });
  }
};
