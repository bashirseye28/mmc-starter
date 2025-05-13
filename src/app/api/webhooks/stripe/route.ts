// src/app/api/webhooks/stripe/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { buffer } from "micro"; // Ensure micro is installed (npm i micro)
import { sendDonationReceipt } from "@/lib/emails/sendDonationReceipt";
import { sendAdminNotification } from "@/lib/emails/sendAdminNotification";

// ⛔ Must use Node.js runtime to support raw body
export const runtime = "nodejs";

// 🔒 Disable body parsing to use raw buffer
export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
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

  // ✅ Handle successful one-time or subscription payment
  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      const meta = pi.metadata;

      console.log("✅ PaymentIntent succeeded:", pi.id);

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

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Checkout Session completed:", session.id);
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log("✅ Subscription invoice paid:", invoice.id);
      break;
    }

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}