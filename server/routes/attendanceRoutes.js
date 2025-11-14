import express from "express";
import {
  deleteAttendanceByDays,
  enterAttendanceByRoomNo,
  getAttendance,
  getAttendanceByRoomNo,
} from "../controllers/attendanceController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * ✅ Get attendance for a specific room and date
 * @route POST /api/attendance/room
 * @access Private/Admin
 * Body: { roomNo: "101", date?: "Thu Nov 06 2025" }
 */
router.post("/room", protect, admin, getAttendanceByRoomNo);

/**
 * ✅ Create or update attendance (per date)
 * @route POST /api/attendance
 * @access Private/Admin
 * Body: { roomNo, data, details, date? }
 */
router.post("/", protect, admin, enterAttendanceByRoomNo);

/**
 * ✅ Get daily attendance summary / analysis
 * @route POST /api/attendance/analysis
 * @access Private/Admin
 * Body: { date?: "Thu Nov 06 2025" }
 */
router.post("/analysis", protect, admin, getAttendance);

/**
 * ✅ Delete attendance records older than X days
 * @route DELETE /api/attendance/cleanup/:days
 * @access Private/Admin
 * Example: DELETE /api/attendance/cleanup/30
 */
router.delete("/cleanup/:days", protect, admin, deleteAttendanceByDays);

export default router;
