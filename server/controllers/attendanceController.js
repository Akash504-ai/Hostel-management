import asyncHandler from "express-async-handler";
import Attendance from "../models/attendance.js";

/*************** Clean Map Conversion ****************/
const ensureMap = (raw) => {
  const obj =
    raw instanceof Map
      ? Object.fromEntries(raw)
      : JSON.parse(JSON.stringify(raw || {}));

  return new Map(Object.entries(obj || {}));
};

/**************** Get Attendance by Room ************/
const getAttendanceByRoomNo = asyncHandler(async (req, res) => {
  const date = req.body.date || new Date().toDateString();
  const { roomNo } = req.body;

  if (!roomNo) {
    res.status(400);
    throw new Error("Room number is required");
  }

  const attendance = await Attendance.findOne({ date });

  if (!attendance) {
    res.status(404);
    throw new Error(`No attendance found for ${date}`);
  }

  const detailsMap = ensureMap(attendance.details);
  const dataMap = ensureMap(attendance.data);

  const filteredDetails = {};
  const filteredData = {};

  for (const [id, info] of detailsMap.entries()) {
    if (info.roomNo === roomNo) {
      filteredDetails[id] = info;
      filteredData[id] = dataMap.get(id);
    }
  }

  if (Object.keys(filteredDetails).length === 0) {
    res.status(404);
    throw new Error(`No students found for Room No: ${roomNo}`);
  }

  res.json({
    date,
    roomNo,
    details: filteredDetails,
    data: filteredData,
  });
});

/**************** Attendance Analysis ****************/
const getAttendance = asyncHandler(async (req, res) => {
  const date = req.body.date || new Date().toDateString();

  const attendance = await Attendance.findOne({ date });

  if (!attendance) {
    res.status(404);
    throw new Error(`No attendance found for ${date}`);
  }

  const dataMap = ensureMap(attendance.data);
  const detailsMap = ensureMap(attendance.details);

  let total = 0,
    hostel = 0,
    home = 0,
    outside = 0;

  for (const status of dataMap.values()) {
    total++;
    if (status === "Hostel") hostel++;
    else if (status === "Home") home++;
    else if (status === "Outside") outside++;
  }

  res.json({
    date,
    total,
    hostel,
    home,
    outside,
    details: Object.fromEntries(detailsMap),
    data: Object.fromEntries(dataMap),
  });
});

/*************** Enter/Update Attendance *************/
const enterAttendanceByRoomNo = asyncHandler(async (req, res) => {
  const date = req.body.date || new Date().toDateString();
  const { roomNo, data, details } = req.body;

  if (!roomNo || !data || !details) {
    res.status(400);
    throw new Error("Room number, data, and details are required");
  }

  const flatRoomNo = Array.isArray(roomNo) ? roomNo.flat() : [roomNo];

  let attendance = await Attendance.findOne({ date });

  if (attendance) {
    const dataMap = ensureMap(attendance.data);
    const detailsMap = ensureMap(attendance.details);

    flatRoomNo.forEach((room) => {
      if (!attendance.roomNo.includes(room)) attendance.roomNo.push(room);
    });

    Object.entries(data).forEach(([id, status]) => {
      dataMap.set(id, status);
    });

    Object.entries(details).forEach(([id, info]) => {
      detailsMap.set(id, info);
    });

    attendance.data = Object.fromEntries(dataMap);
    attendance.details = Object.fromEntries(detailsMap);

    const updated = await attendance.save();

    res.json({
      success: true,
      message: "Attendance updated",
      attendance: updated,
    });
  } else {
    const created = await Attendance.create({
      roomNo: flatRoomNo,
      date,
      data,
      details,
    });

    res.status(201).json({
      success: true,
      message: "Attendance created",
      attendance: created,
    });
  }
});

/**************** Delete Old Attendance *************/
const deleteAttendanceByDays = asyncHandler(async (req, res) => {
  const days = parseInt(req.params.days);

  if (isNaN(days) || days <= 0) {
    res.status(400);
    throw new Error("Invalid days input");
  }

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const result = await Attendance.deleteMany({
    createdAt: { $lt: cutoff },
  });

  res.json({
    message: `Deleted ${result.deletedCount} records older than ${days} days.`,
  });
});

export {
  getAttendanceByRoomNo,
  enterAttendanceByRoomNo,
  getAttendance,
  deleteAttendanceByDays,
};
