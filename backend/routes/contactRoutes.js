import express from "express";
import { sendEmail }  from "../controllers/contactController.js"
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post('/send-email', isAuth, sendEmail);

export default router;
