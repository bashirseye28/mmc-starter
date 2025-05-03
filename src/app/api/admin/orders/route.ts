import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { getApps, initializeApp, cert } from "firebase-admin/app";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

export async function GET() {
  try {
    const snapshot = await db.collection("orders").get();
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(orders);
  } catch (error: any) {
    console.error("❌ Failed to fetch orders:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
console.log("✅ raw PRIVATE_KEY:", process.env.FIREBASE_PRIVATE_KEY);
console.log("✅ replaced PRIVATE_KEY:", process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"));