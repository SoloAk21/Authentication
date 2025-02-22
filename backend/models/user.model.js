import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email address",
      },
    },
    googleId: { type: String, unique: true, sparse: true },
    password: {
      type: String,
      required: true,
      select: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: {
      token: { type: String },
      expiresAt: { type: Date },
    },
    verificationToken: {
      token: { type: String },
      expiresAt: { type: Date },
    },
  },
  { timestamps: true }
);

// Hash password before saving
// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (!this.password) {
    return next(new Error("Password is required"));
  }

  try {
    const salt = await bcrypt.genSalt(12); // Increased salt rounds
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Hash verificationToken and passwordResetToken before saving
userSchema.pre("save", async function (next) {
  if (
    this.isModified("verificationToken.token") &&
    this.verificationToken.token
  ) {
    try {
      const salt = await bcrypt.genSalt(12);
      this.verificationToken.token = await bcrypt.hash(
        this.verificationToken.token,
        salt
      );
    } catch (error) {
      return next(error);
    }
  }

  if (
    this.isModified("passwordResetToken.token") &&
    this.passwordResetToken.token
  ) {
    try {
      const salt = await bcrypt.genSalt(12);
      this.passwordResetToken.token = await bcrypt.hash(
        this.passwordResetToken.token,
        salt
      );
    } catch (error) {
      return next(error);
    }
  }

  next();
});

export default mongoose.model("User", userSchema);
