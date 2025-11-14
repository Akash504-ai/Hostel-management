import asyncHandler from "express-async-handler";
import Student from "../models/student.js";
import Attendance from "../models/attendance.js";

/**
 * @desc    Add a new student
 * @route   POST /student/add
 * @access  Private/Admin
 */
const addStudent = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    category,
    city,
    contact,
    fatherContact,
    image,
    roomNo,
    blockNo,
    status,
  } = req.body;

  // Check if student already exists
  const existingStudent = await Student.findOne({ name });
  if (existingStudent) {
    res.status(400);
    throw new Error("❌ Student already exists");
  }

  // Create new student
  const student = await Student.create({
    name,
    address,
    category,
    city,
    contact,
    fatherContact,
    image,
    roomNo,
    blockNo,
    status,
  });

  if (student) {
    res.status(201).json({
      message: "✅ Student added successfully",
      student,
    });
  } else {
    res.status(400);
    throw new Error("❌ Invalid student data");
  }
});

/**
 * @desc    Update student profile
 * @route   PUT /student/update
 * @access  Private/Admin
 */
const updateStudentProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.body._id);

  if (!student) {
    res.status(404);
    throw new Error("❌ Student not found");
  }

  // Update only provided fields
  const fields = [
    "name",
    "address",
    "category",
    "city",
    "contact",
    "fatherContact",
    "image",
    "roomNo",
    "blockNo",
    "status",
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) student[field] = req.body[field];
  });

  const updatedStudent = await student.save();

  res.status(200).json({
    message: "✅ Student profile updated successfully",
    student: updatedStudent,
  });
});

/**
 * @desc    Get all students (with pagination + search)
 * @route   GET /student
 * @access  Private/Admin
 */
const getAllStudents = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const count = await Student.countDocuments({ ...keyword });
  const students = await Student.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (!students.length) {
    res.status(404);
    throw new Error("❌ No students found");
  }

  res.status(200).json({
    students,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

/**
 * @desc    Delete a student by ID
 * @route   DELETE /student/:id
 * @access  Private/Admin
 */
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error("❌ Student not found");
  }

  await student.deleteOne();
  res.status(200).json({ message: "🗑️ Student removed successfully" });
});

/**
 * @desc    Get a student by ID
 * @route   GET /student/:id
 * @access  Private/Admin
 */
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error("❌ Student not found");
  }

  res.status(200).json(student);
});

/**
 * @desc    Get students and attendance by room number
 * @route   GET /student/room/:roomId
 * @access  Private/Admin
 */
const getStudentByRoomNo = asyncHandler(async (req, res) => {
  const date = new Date().toDateString();
  const { roomId } = req.params;

  const [attendance, students] = await Promise.all([
    Attendance.findOne({ date, roomNo: { $in: [roomId] } }),
    Student.find({ roomNo: roomId }),
  ]);

  if (!students.length) {
    res.status(404);
    throw new Error("❌ No students found for this room");
  }

  res.status(200).json({
    students,
    attendance: attendance || null,
  });
});

export {
  addStudent,
  updateStudentProfile,
  getAllStudents,
  deleteStudent,
  getStudentById,
  getStudentByRoomNo,
};
