// auth.controller.js
import bcrypt from "bcrypt";

import User from "../models/user.model.js";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email.js";
import { errorHandler } from "../utils/errorHandler.js";

// User Registration
// User Registration
export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(400, "User already exists"));
    }

    console.log("Registering user...");

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      verificationToken: {
        token: verificationToken, // Original token (will be hashed by pre-save hook)
        expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
      },
    });

    await newUser.save();

    // Send verification email with the original token
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};

// Verify Email
export const verifyEmail = async (req, res, next) => {
  const { email, verificationToken } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Check if the verification token is valid and not expired
    if (
      !user.verificationToken ||
      !(await bcrypt.compare(
        verificationToken,
        user.verificationToken.token
      )) || // Compare hashed token
      user.verificationToken.expiresAt < new Date()
    ) {
      return next(errorHandler(400, "Invalid or expired verification token"));
    }

    // Update user's verification status and clear the verification token
    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token after verification
    await user.save();

    // Send welcome email
    await sendWelcomeEmail(email, user.username);

    // Send success response
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

export const resendVerification = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    const verificationToken = Math.floor(100000 + Math.random() * 900000);
    user.verificationToken = {
      token: verificationToken,
      expiresAt: new Date(Date.now() + 3600000), // 1 hour
    };

    await user.save();
    await sendVerificationEmail(email, verificationToken);

    res
      .status(200)
      .json({ success: true, message: "Verification code resent" });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
// User Login

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Save refresh token to the database
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Update last login time
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};
// Forgot Password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Generate a password reset token
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Set the reset token and expiration time
    user.passwordResetToken = {
      token: resetToken, // Original token (will be hashed by pre-save hook)
      expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
    };

    await user.save();

    // Send password reset email with the original token
    await sendPasswordResetEmail(user, resetToken);

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;

    const user = await User.findById(userId).select("+passwordResetToken");

    if (
      !user ||
      !user.passwordResetToken ||
      !(await bcrypt.compare(token, user.passwordResetToken.token)) // Compare hashed token
    ) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    if (user.passwordResetToken.expiresAt < Date.now()) {
      return res
        .status(400)
        .json({ message: "Token expired. Request a new one." });
    }

    user.password = password;
    user.passwordResetToken = undefined;

    await user.save();

    res.json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// User Logout
export const logout = (req, res, next) => {
  try {
    console.log(req);
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    next(errorHandler(500, error.message || "Internal Server Error"));
  }
};
