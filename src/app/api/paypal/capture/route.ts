import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const orderId = url.searchParams.get("orderID");

    if (!orderId) {
      return NextResponse.json({ error: "Missing PayPal order ID" }, { status: 400 });
    }

    const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
        ).toString("base64")}`,
      },
    });

    const order = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: order.message }, { status: response.status });
    }

    return NextResponse.json({
      amount: order.purchase_units[0].amount.value,
      currency: order.purchase_units[0].amount.currency_code,
    });
  } catch (error: any) {
    console.error("PayPal Capture Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}