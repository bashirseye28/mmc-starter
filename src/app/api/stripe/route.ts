import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cartItems, customerInfo, shippingData, orderId } = body;

    // ✅ Extract shipping cost & type
    const shippingCost: number = shippingData?.shippingCost ?? 0;
    const shippingType: string = shippingData?.shippingType ?? "Standard Delivery";

    // ✅ Validate required fields
    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "No items in cart." }, { status: 400 });
    }

    if (!customerInfo?.name || !customerInfo?.email) {
      return NextResponse.json({ error: "Missing customer information." }, { status: 400 });
    }

    // ✅ Format address safely
    const address = shippingData?.address?.trim() || "N/A";
    const city = shippingData?.city?.trim() || "N/A";
    const postcode = shippingData?.postcode?.trim() || "N/A";
    const country = shippingData?.country?.trim() || "N/A";

    // ✅ Calculate subtotal and total paid
    const subtotal = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
    const totalPaid = subtotal + shippingCost;

    // ✅ Prepare Stripe metadata
    const metadata: Record<string, string> = {
      "Order ID": orderId || `MMC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      "Customer Name": customerInfo.name,
      "Customer Email": customerInfo.email,
      "Phone": customerInfo.phone || "N/A",
      "Shipping Address": `${address}, ${city}, ${postcode}, ${country}`,
      "Shipping Method": shippingType,
      "Shipping Cost": shippingCost.toFixed(2),
      "Total Paid": totalPaid.toFixed(2), // ✅ Added
    };

    // ✅ Build line items (products)
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

    // ✅ Add shipping as separate line item
    lineItems.push({
      price_data: {
        currency: "gbp",
        product_data: {
          name: "Shipping",
          description: shippingType,
          images: [], // required by Stripe API
        },
        unit_amount: Math.round(shippingCost * 100),
      },
      quantity: 1,
    });

    // ✅ Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerInfo.email,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      payment_intent_data: {
        metadata,
      },
      metadata, // for webhooks or review
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("❌ Stripe Checkout Error:", error.message);
    return NextResponse.json(
      { error: `Payment failed: ${error.message}` },
      { status: 500 }
    );
  }
}