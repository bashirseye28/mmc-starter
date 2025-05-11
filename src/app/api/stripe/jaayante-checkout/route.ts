import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ 1️⃣ Jaayante Donation Flow
    if (body.tier && body.priceId && body.amount) {
      const {
        tier,
        priceId,
        donorName = "",
        email = "",
        isAnonymous,
        amount,
      } = body;

      const metadata = {
        donor_name: isAnonymous
          ? "Anonymous Supporter"
          : donorName.trim() || "Valued Donor",
        donor_email: isAnonymous
          ? "donor@anonymous.com"
          : email.trim() || "not_provided@mmc.org",
        donation_tier: tier,
        donation_amount: amount.toFixed(2),
        donation_date: new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Europe/London',
        }),
      };

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/cancel`,
        customer_email: isAnonymous ? "donor@anonymous.com" : email.trim(),
        payment_intent_data: {
          metadata, // ✅ This is what gets saved to the Payment
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // ✅ 2️⃣ Optional Cart Checkout Flow
    if (Array.isArray(body.cartItems)) {
      const lineItems = body.cartItems.map((item: any) => {
        if (!item.price || !item.quantity) {
          throw new Error(`Invalid cart item: ${JSON.stringify(item)}`);
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

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
        payment_intent_data: {
          metadata: { order_id: orderId },
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // ❌ Invalid request
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });

  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}