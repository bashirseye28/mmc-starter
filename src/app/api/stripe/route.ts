import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cartItems, shippingCost, shippingType, customerInfo } = body;

    // ✅ 1. Validate Request Data
    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "No items in cart." }, { status: 400 });
    }

    if (!customerInfo || !customerInfo.name || !customerInfo.email) {
      return NextResponse.json({ error: "Missing customer information." }, { status: 400 });
    }

    console.log("📦 Received Order Data:", {
      cartItems,
      shippingCost,
      shippingType,
      customerInfo,
    });

    // ✅ 2. Format Address Safely
    const address = customerInfo.address?.trim() || "N/A";
    const city = customerInfo.city?.trim() || "N/A";
    const postcode = customerInfo.postcode?.trim() || "N/A";
    const country = customerInfo.country?.trim() || "N/A";

    // ✅ 3. Order Metadata (Ensuring Valid Format)
    const orderMetadata: { [key: string]: string } = {
      customer_name: customerInfo.name || "N/A",
      customer_email: customerInfo.email || "N/A",
      customer_phone: customerInfo.phone || "N/A",
      customer_address: `${address}, ${city}, ${postcode}, ${country}`, 
      shipping_cost: shippingCost?.toFixed(2) || "0.00",
      shipping_type: shippingType || "Standard Delivery",
    };

    console.log("📝 Stripe Metadata:", orderMetadata);

    // ✅ 4. Format Line Items for Stripe
    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          description: `Qty: ${item.quantity}`,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // ✅ 5. Add Shipping as a Separate Line Item
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "gbp",
          product_data: {
            name: "Shipping Cost",
            description: shippingType || "Standard Delivery",
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // ✅ 6. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      payment_intent_data: {
        metadata: orderMetadata,
      },
    });

    console.log("✅ Stripe Session Created:", session.url);

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("❌ Stripe Checkout Error:", error.message);

    return NextResponse.json(
      { error: `Payment failed: ${error.message}` },
      { status: 500 }
    );
  }
}