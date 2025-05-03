import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend"; // ✅ example using Resend

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    // ✅ Send email
    const emailResult = await resend.emails.send({
      from: "orders@yourdomain.com",
      to: session.customer_email!,
      subject: "Your Order Confirmation",
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order ID: ${session.metadata?.["Order ID"] ?? "N/A"}</p>
        <p>Total Paid: £${session.metadata?.["Total Paid"] ?? "N/A"}</p>
      `,
    });

    console.log("✅ Email sent:", emailResult);

    return NextResponse.json(session);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}