import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Donation from "@/models/Donation";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, amount, frequency, method } = await req.json();

    if (!email || !amount || !method) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const donation = new Donation({ email, amount, frequency, method });
    await donation.save();

    return NextResponse.json({ success: "Donation saved successfully" });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to save donation" }, { status: 500 });
  }
}