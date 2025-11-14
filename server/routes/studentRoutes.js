import express from "express";
import {
  addStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudentProfile,
  getStudentByRoomNo,
} from "../controllers/studentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @desc    Get all students (with pagination & search)
 * @route   GET /student/all
 * @access  Private
 */
router.get("/all", protect, getAllStudents);

/**
 * @desc    Add a new student
 * @route   POST /student/add
 * @access  Private/Admin
 */
router.post("/add", protect, admin, addStudent);

/**
 * @desc    Get students by room number
 * @route   GET /student/room/:roomId
 * @access  Private
 */
router.get("/room/:roomId", protect, getStudentByRoomNo);

/**
 * @desc    Get, Update, or Delete a student by ID
 * @route   /student/:id
 * @access  Private/Admin (delete/update), Private (get)
 */
router
  .route("/:id")
  .get(protect, getStudentById)
  .put(protect, admin, updateStudentProfile)
  .delete(protect, admin, deleteStudent);

export default router;
