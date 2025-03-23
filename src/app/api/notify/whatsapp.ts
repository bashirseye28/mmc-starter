import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
  try {
    const { orderId, name, total, items } = await req.json();

    // ✅ Basic validation
    if (!orderId || !name || !total || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { success: false, message: "Missing or invalid order details." },
        { status: 400 }
      );
    }

    // ✅ Load and validate required environment variables
    const {
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
      TWILIO_PHONE,
      ADMIN_WHATSAPP,
      ADMIN_ORDER_LINK,
    } = process.env;

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE || !ADMIN_WHATSAPP) {
      return NextResponse.json(
        { success: false, message: "Twilio environment variables are missing." },
        { status: 500 }
      );
    }

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const adminLink = ADMIN_ORDER_LINK || "http://localhost:3000/admin/orders";

    // ✅ Construct WhatsApp message
    const message = `
📢 *New Order Received*
🧾 *Order ID:* ${orderId}
👤 *Customer:* ${name}
💰 *Total:* £${total.toFixed(2)}
🛒 *Items:*
${items.map((item: any) => `- ${item.name} x${item.quantity} (£${item.price})`).join("\n")}

🔗 *View Orders:* ${adminLink}
    `;

    // ✅ Send WhatsApp message
    await client.messages.create({
      from: TWILIO_PHONE.startsWith("whatsapp:") ? TWILIO_PHONE : `whatsapp:${TWILIO_PHONE}`,
      to: ADMIN_WHATSAPP.startsWith("whatsapp:") ? ADMIN_WHATSAPP : `whatsapp:${ADMIN_WHATSAPP}`,
      body: message,
    });

    return NextResponse.json({ success: true, message: "✅ WhatsApp alert sent!" });
  } catch (error) {
    console.error("❌ WhatsApp send error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send WhatsApp alert." },
      { status: 500 }
    );
  }
}