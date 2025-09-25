import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  year: { type: Number, enum: [1,2,3,4], required: true },
  gender: { type: String, enum: ["male","female"], required: true },
  stay: { type: String, enum: ["hostel","dayscholar","pg-hostel"], required: true },
  hostelName: { type: String, default: null },
  password: { type: String, required: true }
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
