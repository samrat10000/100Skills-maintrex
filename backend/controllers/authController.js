import ClubAdmin from "../models/ClubAdmin.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dontenv from "dotenv"
import mongoose from "mongoose";
import Event from "../models/Event.js"

dontenv.config();

export const registerAdmin = async(req , res)=>{

    const {userId , password} = req.body;

        try {
             const hashedPassword = await bcrypt.hash(password , 10);
             const newUser = new ClubAdmin({userId , password: hashedPassword});
             await newUser.save();
             res.status(201).json({message:"user registered"});
        } catch (error) {
            res.status(500).json({error:error.message});
        }
}

export const loginadmin=async(req , res)=>{
    const {userId , password} = req.body;
    try {
        const user = await ClubAdmin.findOne({userId});

        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password , user.password);
         if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

         const token= jwt.sign({id: user._id } , process.env.JWT_SECRET , {expiresIn : '2h'});
         res.json({ token, user: { id: user._id, username: user.username, email: user.email } });

    } catch (error) {
         res.status(500).json({error: error.message });
    }
}

