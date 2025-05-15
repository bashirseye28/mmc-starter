import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "info@manchestermuridcommunity.org";
const ADMIN_EMAIL = process.env.VOLUNTEER_ADMIN_EMAIL || "info@manchestermuridcommunity.org";

export async function POST(req: NextRequest) {
  try {
    const { email, fullName } = await req.json();

    if (!email || !fullName) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Send confirmation to volunteer
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Thank you for volunteering with MMC!",
      replyTo: ADMIN_EMAIL,
      html: `
        <p>Dear ${fullName},</p>
        <p>Thank you for volunteering with Manchester Murid Community. Your dedication helps us serve our community better.</p>
        <p>We’ll contact you shortly regarding next steps.</p>
        <br />
        <p>Warm regards,</p>
        <p>MMC Team</p>
      `,
    });

    // ✅ Notify admin
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: "New Volunteer Application",
      html: `
        <h3>New Volunteer Sign-up</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Resend error:", error);
    return NextResponse.json(
      { error: "Email sending failed" },
      { status: 500 }
    );
  }
}