import express from "express"
import {createEvent ,getEventById , getAllEvent} from "../controllers/eventController.js"
import generateSignature from "../controllers/upload.js"
import {auth} from "../middlewares/authMiddleware.js"
const router = express.Router();

router.post("/create",auth,createEvent);

router.get("/allevents" , getAllEvent);
router.get("/get/:id" , getEventById);
// router.put("/edit/:id", editEvent);

router.post("/",generateSignature);


export default router;