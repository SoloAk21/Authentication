import express from "express";
import {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerification,
} from "../controllers/auth.controller.js";
import passport from "passport";
import jwt from "jsonwebtoken"; // Import jwt
import { errorHandler } from "../utils/errorHandler.js"; // Import errorHandler
import { verifyAuth } from "../middlewares/verifyAuth.middleware.js";
import {
  loginLimiter,
  passwordResetLimiter,
} from "../middlewares/rateLimiter.middleware.js";

const router = express.Router();

// Regular authentication routes
router.post("/signup", register);
router.post("/login", loginLimiter, login);
router.post("/logout", logout);

// Email verification and password reset routes
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post(
  "/reset-password/:userId/:token",
  passwordResetLimiter,
  resetPassword
);
router.post("/resend-verification", resendVerification);

// Google OAuth login route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Redirect on failure
  }),
  (req, res, next) => {
    try {
      // Generate JWT Token
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 3600000, // 1 hour
      });

      // Redirect to the frontend profile page
      res.redirect(`${process.env.FRONTEND_URL}/profile`);
    } catch (error) {
      console.error("Google OAuth Callback Error:", error);
      next(errorHandler(500, "Server error"));
    }
  }
);

router.get("/check-auth", verifyAuth, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
export default router;
