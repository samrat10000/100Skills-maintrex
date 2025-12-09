import express from "express";
import {registerHeadAdmin , loginHeadAdmin , getAllClubs , registerNewClub} from "../controllers/headAdminAuth.js"
import {auth} from "../middlewares/authMiddleware.js" 

const router = express.Router();

router.post("/auth/headadminLogin" , loginHeadAdmin)
router.post("/auth/headadminRegister" , registerHeadAdmin)
router.get("/getAllClubs" , auth , getAllClubs);
router.post("/registerNewClub" , auth , registerNewClub);


export default router;
