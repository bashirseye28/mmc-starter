// /src/app/api/orders/route.ts
import { NextResponse } from "next/server";
import admin from "firebase-admin";

// ✅ Initialize Admin SDK once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    // ✅ Optional: Validate fields
    if (!orderData.orderId || !orderData.customerData?.name) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const db = admin.firestore();
    await db.collection("orders").doc(orderData.orderId).set({
      ...orderData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("✅ Order saved:", orderData.orderId);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Error saving order:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}