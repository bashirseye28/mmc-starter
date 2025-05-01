// File: /src/app/api/daahira/donate/route.ts

import { NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id');

  if (!sessionId) {
    return new Response(JSON.stringify({ error: 'Missing session_id' }), { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return new Response(
      JSON.stringify({
        donor_name: session.metadata?.donor_name,
        donor_email: session.metadata?.donor_email,
        donation_amount: session.metadata?.donation_amount,
        donation_frequency: session.metadata?.donation_frequency,
        payment_method_types: session.payment_method_types?.[0] || 'Card',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('❌ Stripe session retrieval error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
    });
  }
}