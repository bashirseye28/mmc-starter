import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia", // ✅ Use stable version
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔹 1️⃣ Handle Donations (if `tier` & `priceId` exist)
    if (body.tier && body.priceId) {
      const { tier, priceId, donorName, email, isAnonymous } = body;

      // ✅ Create Donation Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/cancel`,
        metadata: {
          donor_name: isAnonymous ? "Anonymous" : donorName,
          donor_email: isAnonymous ? "anonymous@donation.com" : email,
          donation_tier: tier,
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // 🔹 2️⃣ Handle Product Checkout (if `cartItems` exist)
    if (body.cartItems && Array.isArray(body.cartItems)) {
      const lineItems = body.cartItems.map((item: any) => {
        if (!item.price || !item.quantity) {
          throw new Error(`Invalid item: ${JSON.stringify(item)}`);
        }

        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: item.name,
              images: item.image ? [item.image] : [],
            },
            unit_amount: Math.round(item.price * 100), // Convert GBP to pence
          },
          quantity: item.quantity,
        };
      });

      // ✅ Store Order in Database First
      const orderId = `ORDER_${Date.now()}`;
      // 🔥 Save `body.cartItems` in your database with `orderId`

      // ✅ Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?orderId=${orderId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
        metadata: {
          order_id: orderId, // ✅ Store Order ID, Not full cart JSON
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // ❌ If neither donation nor product purchase
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}