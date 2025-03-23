import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  try {
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
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}