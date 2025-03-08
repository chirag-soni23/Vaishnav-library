import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import chat from "../controllers/aiController.js"

const router = express.Router();

router.post("/chat",isAuth,chat)

export default router;