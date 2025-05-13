// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { buffer } from "micro";
import { sendDonationReceipt } from "@/lib/emails/sendDonationReceipt";
import { sendAdminNotification } from "@/lib/emails/sendAdminNotification";

export const runtime = "nodejs";

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

  // 🔔 Handle supported events
  const handleNotification = async (meta: Stripe.Metadata | null | undefined) => {
    if (!meta?.donor_email) return;

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
        frequency: meta.donation_frequency,
        date: meta.donation_date,
        receiptId: meta.receipt_id,
      }),
    ]);
  };

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      await handleNotification(pi.metadata);
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      await handleNotification(invoice.metadata);
      break;
    }

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Checkout session completed:", session.id);
      await handleNotification(session.metadata); // 🔥 important in your case
      break;
    }

    default:
      console.log(`🔔 Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}