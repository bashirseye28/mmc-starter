// File: src/app/api/stripe/jaayante-checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ 1️⃣ Handle Jaayante Donation
    if (body.tier && body.priceId && body.amount) {
      const { tier, priceId, donorName, email, isAnonymous, amount } = body;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/cancel`,
        metadata: {
          donor_name: isAnonymous ? 'Anonymous' : donorName,
          donor_email: isAnonymous ? 'anonymous@donation.com' : email,
          donation_tier: tier,
          donation_amount: amount.toString(), // ✅ ADD donation amount!
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // ✅ 2️⃣ Handle Product Checkout (if using cartItems)
    if (body.cartItems && Array.isArray(body.cartItems)) {
      const lineItems = body.cartItems.map((item: any) => {
        if (!item.price || !item.quantity) {
          throw new Error(`Invalid item: ${JSON.stringify(item)}`);
        }

        return {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: item.name,
              images: item.image ? [item.image] : [],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        };
      });

      const orderId = `ORDER_${Date.now()}`;
      // TODO: optionally save cartItems to DB with orderId

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
        metadata: {
          order_id: orderId,
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // ❌ No valid body detected
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}