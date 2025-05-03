// /src/app/api/admin/orders/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebaseAdmin";

export async function GET() {
  try {
    const snapshot = await db.collection("orders").get();
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(orders);
  } catch (err: any) {
    console.error("❌ Failed to fetch orders:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}