import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import HeadAdmin from "./models/HeadAdmin.js";
import ClubAdmin from "./models/ClubAdmin.js";
import Event from "./models/Event.js";

// Load env vars
dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear all existing data
    await HeadAdmin.deleteMany({});
    await ClubAdmin.deleteMany({});
    await Event.deleteMany({});
    console.log("Cleared existing data from HeadAdmin, ClubAdmin, and Events collections.");

    // Create Super Admin
    const hashedPassword = await bcrypt.hash("12345", 10);
    const superAdmin = new HeadAdmin({
      userId: "superadmin",
      password: hashedPassword,
    });

    await superAdmin.save();
    console.log("Super Admin created successfully (User: superadmin, Pass: 12345)");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error.message);
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
