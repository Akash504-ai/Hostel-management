import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

/**
 * @desc    Protect routes - verify JWT token
 * @access  Private
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user (without password) to request
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("❌ User not found, invalid token");
      }

      next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      res.status(401);
      throw new Error("❌ Not authorized, token failed or expired");
    }
  } else {
    res.status(401);
    throw new Error("❌ Not authorized, no token provided");
  }
});

/**
 * @desc    Grant access only to admins
 * @access  Private/Admin
 */
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403); // 403 = Forbidden (not just unauthorized)
    throw new Error("🚫 Access denied. Admins only.");
  }
};

export { protect, admin };
