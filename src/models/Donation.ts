import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  email: String,
  amount: Number,
  frequency: String,
  method: String,
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);