// routes/user.routes.js
import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth.middleware.js";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

// Protected route: Get user profile
router.get("/profile", verifyAuth, getUserProfile);

export default router;
