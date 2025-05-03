// src/app/api/email/confirmation/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

function orderConfirmationTemplate(order: {
  name: string;
  orderId: string;
  cartItems: { name: string; quantity: number; price: number }[];
  total: number;
}) {
  const itemsHtml = order.cartItems
    .map(
      (item) =>
        `<li>${item.name} x${item.quantity} - £${(item.price * item.quantity).toFixed(2)}</li>`
    )
    .join("");

  return `
    <h1>Thank you, ${order.name}!</h1>
    <p>Your order <strong>${order.orderId}</strong> has been received.</p>
    <ul>${itemsHtml}</ul>
    <p>Total: <strong>£${order.total.toFixed(2)}</strong></p>
    <p>We will notify you once your order is processed.</p>
  `;
}

export async function POST(req: Request) {
  try {
    const { to, orderId, name, cartItems, total } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const email = await resend.emails.send({
      from: "MMC Orders <orders@manchestermuridcommunity.org>",
      to: [to],
      bcc: ["info@manchestermuridcommunity.org"],
      subject: `✅ Order Confirmation: ${orderId}`,
      html: orderConfirmationTemplate({ name, orderId, cartItems, total }),
    });

    if (email.error) {
      console.error("❌ Resend API Error:", email.error);
      throw new Error(email.error.message);
    }

    console.log("✅ Confirmation email sent:", email.data?.id);

    return NextResponse.json({ success: true, emailId: email.data?.id });
  } catch (error: any) {
    console.error("❌ Email error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}