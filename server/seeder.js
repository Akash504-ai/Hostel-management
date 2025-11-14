import dotenv from "dotenv";
import students from "./data/students.js";
import Student from "./models/student.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Student.deleteMany();
    await Student.insertMany(students); // added to actually import data
    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error Importing Data: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Student.deleteMany();
    console.log("🗑️  Data Destroyed Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error Destroying Data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
