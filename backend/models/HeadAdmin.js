// models/HeadAdmin.js
import mongoose from "mongoose";

const headAdminSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const HeadAdmin = mongoose.model("HeadAdmin", headAdminSchema);
export default HeadAdmin;
