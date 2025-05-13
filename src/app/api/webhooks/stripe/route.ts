// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { buffer } from "micro";
import { sendDonationReceipt } from "@/lib/emails/sendDonationReceipt";
import { sendAdminNotification } from "@/lib/emails/sendAdminNotification";

// Ensure not using edge runtime (needed for raw body access)
export const runtime = "nodejs";

// Disable Next.js body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    const rawBody = await buffer(req.body as any);
    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
    }

    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature error:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ✅ Handle payment success events
  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const meta = pi.metadata;

      if (meta?.donor_email) {
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
            frequency: meta.donation_frequency || "One-time",
            date: meta.donation_date,
            receiptId: meta.receipt_id,
          }),
        ]);
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const meta = invoice.metadata;

      if (meta?.donor_email) {
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
            frequency: meta.donation_frequency || "Recurring",
            date: meta.donation_date,
            receiptId: meta.receipt_id,
          }),
        ]);
      }
      break;
    }

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Checkout session completed:", session.id);
      break;
    }

    default:
      console.log(`🔔 Unhandled event: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}