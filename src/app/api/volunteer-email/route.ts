// /app/api/volunteer-email/route.ts

import { Resend } from "resend";
import { NextResponse } from "next/server";
import VolunteerTemplate from "@/app/api/emails/VolunteerTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, fullName }: { email: string; fullName: string } = await req.json();

    if (!email || !fullName) {
      return NextResponse.json(
        { error: "Missing email or full name." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "MMC <noreply@mmc.org>",
      to: email,
      subject: "Thank You for Volunteering with MMC!",
      react: VolunteerTemplate({ fullName }),
    });

    if (error) {
      console.error("Resend Email Error:", error);
      return NextResponse.json({ error: "Email failed to send." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}