import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    try {
      await db.collection('donations').add({
        sessionId: session.id,
        donorName: metadata.donor_name || 'Anonymous',
        customer_email: metadata.donor_email || session.customer_email || '',
        amount_total: session.amount_total || 0,
        currency: session.currency?.toUpperCase() || 'GBP',
        status: session.payment_status || 'pending',
        reference: metadata.donation_reference || '',
        frequency: metadata.donation_frequency || 'one-time',
        receipt_id: metadata.receipt_id || '',
        message: metadata.message || '',
        created: Timestamp.now(),
        source: 'stripe',
      });

      console.log('✅ Donation saved to Firestore');
    } catch (err) {
      console.error('❌ Failed to save donation:', err);
    }
  }

  return new Response('Webhook received', { status: 200 });
}