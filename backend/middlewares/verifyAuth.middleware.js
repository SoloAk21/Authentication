// middlewares/verifyAuth.middleware.js
import jwt from "jsonwebtoken";

import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/user.model.js";

export const verifyAuth = async (req, res, next) => {
  try {
    // Get the token from the request headers
    // const token = req.headers.authorization?.split(" ")[1]; // Expects "Bearer <token>"
    const token = req.cookies.token;

    if (!token) {
      return next(errorHandler(401, "Unauthorized: No token provided"));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(errorHandler(401, "Unauthorized: Token expired"));
    }
    if (error.name === "JsonWebTokenError") {
      return next(errorHandler(401, "Unauthorized: Invalid token"));
    }
    next(errorHandler(500, "Internal Server Error"));
  }
};
