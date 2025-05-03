// /src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    if (!orderData.orderId || !orderData.customerData?.name) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await db.collection("orders").doc(orderData.orderId).set({
      ...orderData,
      createdAt: new Date(), // ✅ or admin.firestore.FieldValue.serverTimestamp()
    });

    console.log("✅ Order saved:", orderData.orderId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Error saving order:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}