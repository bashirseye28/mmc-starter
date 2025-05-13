import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { buffer } from "micro";
import { sendDonationReceipt } from "@/lib/emails/sendDonationReceipt";
import { sendAdminNotification } from "@/lib/emails/sendAdminNotification";

// Force Node runtime — no edge
export const runtime = "nodejs";

// Disable Next.js body parsing for raw Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia", // Use the same version Stripe shows in your dashboard
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    const rawBody = await buffer(req.body as any);
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
  }

  // ✅ Handle event types
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata;

    if (!meta || !meta.donor_email) {
      console.warn("⚠️ No metadata found on session:", session.id);
      return NextResponse.json({ received: true });
    }

    // Trigger both emails
    try {
      await Promise.all([
        sendDonationReceipt({
          to: meta.donor_email,
          name: meta.donor_name || "Donor",
          amount: meta.donation_amount,
          reference: meta.donation_reference,
          date: meta.donation_date,
          receiptId: meta.receipt_id,
        }),
        sendAdminNotification({
          name: meta.donor_name || "Donor",
          email: meta.donor_email,
          amount: meta.donation_amount,
          reference: meta.donation_reference,
          date: meta.donation_date,
          receiptId: meta.receipt_id,
          frequency: meta.donation_frequency || "N/A",
        }),
      ]);

      console.log("📬 Receipt and admin email sent for:", session.id);
    } catch (emailErr) {
      console.error("❌ Email sending error:", emailErr);
    }
  }

  return NextResponse.json({ received: true });
}