import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { db } from '@/lib/firebaseAdmin'; // adjust path as needed
import { Timestamp } from 'firebase-admin/firestore';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed.', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ✅ Handle checkout session complete
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await db.collection('donations').add({
        sessionId: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_email,
        status: session.status,
        created: Timestamp.now(),
      });

      console.log('✅ Donation saved to Firestore');
    } catch (err) {
      console.error('❌ Failed to save donation:', err);
    }
  }

  return new Response('Webhook received', { status: 200 });
}