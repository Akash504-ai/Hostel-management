import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["General", "OBC", "SC", "ST", "Other"],
      default: "General",
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    contact: {
      type: String, // use String instead of Number (handles leading zeros and long digits)
      required: [true, "Contact number is required"],
      match: [/^[0-9]{10}$/, "Contact number must be 10 digits"],
    },
    fatherContact: {
      type: String,
      match: [/^[0-9]{10}$/, "Father's contact number must be 10 digits"],
    },
    image: {
      type: String,
      default: "https://res.cloudinary.com/demo/image/upload/default-avatar.png",
    },
    roomNo: {
      type: String,
      required: [true, "Room number is required"],
      trim: true,
    },
    blockNo: {
      type: String,
      required: [true, "Block number is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Hostel", "Outside", "Home"],
      default: "Hostel",
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
