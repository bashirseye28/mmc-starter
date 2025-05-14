import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/app/lib/firebaseAdmin"; // ✅ Corrected path to Firestore

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

// Stripe requires raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Helper: Convert readable stream to buffer
async function buffer(readable: ReadableStream<Uint8Array>) {
  const reader = readable.getReader();
  const chunks = [];
  let done: boolean | undefined;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    if (value) chunks.push(value);
    done = doneReading;
  }
  return Buffer.concat(chunks);
}

export async function POST(req: NextRequest) {
  const rawBody = await buffer(req.body!);
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata || {};

      const donation = {
        receipt_id: metadata.receipt_id,
        donor_name: metadata.donor_name || "Anonymous",
        donor_email: metadata.donor_email || "Not Provided",
        donation_amount: metadata.donation_amount,
        donation_frequency: metadata.donation_frequency,
        donation_reference: metadata.donation_reference || "General",
        donation_date: metadata.donation_date,
        message: metadata.message || "",
        createdAt: new Date().toISOString(),
      };

      try {
        await db.collection("donations").doc(donation.receipt_id).set(donation);
        console.log("✅ Donation saved to Firestore:", donation.receipt_id);
      } catch (err) {
        console.error("❌ Failed to save donation to Firestore:", err);
      }

      break;
    }

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}