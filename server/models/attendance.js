import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },

    // Store multiple room numbers (strings)
    roomNo: { type: [String], default: [] },

    // Map of studentId → status (Hostel, Home, Outside)
    data: {
      type: Map,
      of: String,
      default: {},
    },

    // Map of studentId → info object (name, contact, roomNo)
    details: {
      type: Map,
      of: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
