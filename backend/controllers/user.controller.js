// controllers/user.controller.js
import { errorHandler } from "../utils/errorHandler.js";

export const getUserProfile = async (req, res, next) => {
  try {
    // The user is already attached to the request object by verifyAuth middleware
    const user = req.user;

    // Return the user's profile (excluding sensitive data like password)
    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

export default { getUserProfile };
