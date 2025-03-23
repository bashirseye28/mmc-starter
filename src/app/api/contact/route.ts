import { db } from "@/app/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactTemplate from "@/app/api/emails/ContactTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, subscribe } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Save to Firestore
    await addDoc(collection(db, "contacts"), {
      name,
      email,
      phone,
      message,
      subscribe,
      submittedAt: new Date(),
    });

    // ✅ Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: "MMC <noreply@mmc.org>",
      to: email,
      subject: "Thank You for Contacting MMC",
      react: ContactTemplate({ name }),
    });

    // ✅ (Optional) Notify Admin
    await resend.emails.send({
      from: "MMC <noreply@mmc.org>",
      to: "admin@mmc.org",
      subject: `New Contact Message from ${name}`,
      text: `New contact received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Contact form error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}