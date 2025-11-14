import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @desc    Register a new user / Get all users (Admin)
 * @route   POST /users  - Register
 * @route   GET /users   - Admin only
 * @access  Public / Private(Admin)
 */
router.route("/")
  .post(registerUser)   // register new user
  .get(protect, admin, getUsers);  // get all users

/**
 * @desc    Login user and get token
 * @route   POST /users/login
 * @access  Public
 */
router.post("/login", authUser);

/**
 * @desc    Get or update logged-in user profile
 * @route   GET /users/profile
 * @route   PUT /users/profile
 * @access  Private
 */
router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

/**
 * @desc    Admin routes: get, update, or delete user by ID
 * @route   GET /users/:id
 * @route   PUT /users/:id
 * @route   DELETE /users/:id
 * @access  Private/Admin
 */
router.route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
