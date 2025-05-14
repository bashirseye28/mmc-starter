// /src/app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { db } from '@/lib/firebaseAdmin';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const rawBody = await req.arrayBuffer();
  const body = Buffer.from(rawBody);
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed.', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // ✅ Only handle successful donations
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Example: Save donation to Firestore
    try {
      await db.collection('donations').add({
        sessionId: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_email,
        created: Stripe.Timestamp.now,
        status: session.status,
      });

      console.log('✅ Donation saved to Firestore');
    } catch (err) {
      console.error('❌ Failed to save donation:', err);
    }
  }

  return NextResponse.json({ received: true });
}