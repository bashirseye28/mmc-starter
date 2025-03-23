import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactTemplate from "@/app/api/emails/ContactTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name, message } = await req.json();

    // ✅ Basic validation
    if (!email || !name || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Send confirmation email to user
    await resend.emails.send({
      from: "MMC <noreply@mmc.org>", // Your verified sender
      to: email,
      subject: "Thank You for Contacting MMC",
      react: ContactTemplate({ name }),
    });

    // ✅ Notify admin (plain HTML or use a custom template too)
    await resend.emails.send({
      from: "MMC Contact <noreply@mmc.org>",
      to: "admin@mmc.org", // ⛳️ Update to actual admin address
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>📬 New Contact Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("❌ Contact email error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}