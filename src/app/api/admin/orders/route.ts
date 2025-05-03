// /pages/api/admin/orders.ts or /app/api/admin/orders/route.ts (Next.js App Router)

import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebaseAdmin"; // Adjust the import path as necessary

export async function GET() {
  try {
    const snapshot = await db.collection("orders").get();
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("❌ Failed to fetch orders", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}