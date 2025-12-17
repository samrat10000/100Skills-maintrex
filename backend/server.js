import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import { configDotenv } from "dotenv";
import connectMongo from "./config/db.js";
import eventRoutes from "./routes/eventRoutes.js";
import cloudinaryRoutes from "./routes/cloudinaryRoutes.js";
import authRoutes from "./routes/auth.js";
import clubdashboardRoutes from "./routes/clubdashboardRoutes.js";
import headAdminAuth from "./routes/headAdmin.js";
configDotenv();
connectMongo();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

app.use("/api/events", eventRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/auth", authRoutes);

app.use("/api", clubdashboardRoutes);
app.use("/api", headAdminAuth);

app.listen(process.env.PORT, () => {
  // console.log(`server is runnig on PORT http://localhost:${process.env.PORT}`);
});
