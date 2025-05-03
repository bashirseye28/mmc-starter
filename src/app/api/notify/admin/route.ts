// /src/app/api/notify/admin/route.ts

import { NextResponse } from "next/server";
import twilio from "twilio";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { orderId, customerName, total } = await req.json();

    const {
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
      TWILIO_PHONE,
      ADMIN_WHATSAPP,
      RESEND_API_KEY,
    } = process.env;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE || !ADMIN_WHATSAPP) {
      throw new Error("Missing Twilio environment variables.");
    }

    if (!RESEND_API_KEY) {
      throw new Error("Missing Resend API key.");
    }

    // ✅ Twilio client
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const message = await client.messages.create({
      from: TWILIO_PHONE,  // e.g. 'whatsapp:+14155238886'
      to: ADMIN_WHATSAPP,  // e.g. 'whatsapp:+447541475547'
      body: `✅ New Order!\nOrder ID: ${orderId}\nCustomer: ${customerName}\nTotal: £${total}`,
    });

    console.log("✅ WhatsApp sent:", message.sid);

    // ✅ Resend email
    const resend = new Resend(RESEND_API_KEY);

    const emailResponse = await resend.emails.send({
      from: "MMC Orders <orders@manchestermuridcommunity.org>",
      to: ["info@manchestermuridcommunity.org"],
      subject: `✅ New Order Notification: ${orderId}`,
      html: `
        <h1>New Order Received</h1>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Total:</strong> £${total.toFixed(2)}</p>
      `,
    });

    console.log("✅ Admin email sent:", emailResponse);

    return NextResponse.json({
      success: true,
      whatsappId: message.sid,
      emailResult: emailResponse,
    });
  } catch (error: any) {
    console.error("❌ Notification error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}