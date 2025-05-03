// /app/api/email/confirmation/route.ts
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, orderId, total } = await req.json();

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: `Your Order Confirmation - ${orderId}`,
      text: `Thank you for your order ${orderId}. Total: £${total.toFixed(2)}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order ID: <strong>${orderId}</strong></p>
        <p>Total Paid: <strong>£${total.toFixed(2)}</strong></p>
        <p>We’ll process your order shortly.</p>
      `,
    };

    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ SendGrid error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}