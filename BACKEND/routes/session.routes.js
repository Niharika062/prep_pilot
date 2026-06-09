import express from 'express';
import { startSession, submitAnswer, startSessionWithResume } from '../controllers/session.controller.js';
import verifyToken from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";


const router = express.Router();

// router.post(path, middleware1, middleware2, controller)
// first verify the token then start session, only login users can access
router.post("/start", verifyToken, startSession);
router.post("/start-with-resume", verifyToken, upload.single("resume"), startSessionWithResume);
router.post("/:sessionId/answer", verifyToken, submitAnswer);

export default router;