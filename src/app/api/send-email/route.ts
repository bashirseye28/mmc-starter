import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, amount, method } = await req.json();

    if (!email || !amount || !method) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can change this
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Donation Confirmation - Thank You!",
      html: `<h2>Thank You for Your Donation!</h2>
             <p>You donated <strong>£${amount}</strong> via <strong>${method}</strong>.</p>
             <p>Your support helps us continue our mission.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: "Email sent successfully" });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}