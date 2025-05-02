// src/app/api/volunteer/route.ts

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// ✅ Validate RESEND_API_KEY exists
const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  throw new Error("❌ RESEND_API_KEY is not set in environment variables.");
}

// ✅ Initialize Resend client
const resend = new Resend(resendApiKey);

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // ✅ Basic validation
    if (!data.email || !data.fullName || !data.role) {
      return NextResponse.json(
        { error: "Missing required fields (email, fullName, role)." },
        { status: 400 }
      );
    }

    // ✅ Send the email
    await resend.emails.send({
      from: "Manchester Murid Community <no-reply@manchestermuridcommunity.org>",
      to: data.email,
      subject: "Thank You for Volunteering!",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Hi ${data.fullName},</h2>
          <p>Thank you for applying to volunteer as a <strong>${data.role}</strong>!</p>
          <p>We'll be reviewing your application and get in touch with you soon.</p>
          <p>— The Team</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Email sending failed:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}