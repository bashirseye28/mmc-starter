import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true }, // ❌ Remove `unique: true`
  phone: { type: String, required: true },
  role: { type: String, required: true },
  message: { type: String },
});

export default mongoose.models.Volunteer || mongoose.model("Volunteer", VolunteerSchema);