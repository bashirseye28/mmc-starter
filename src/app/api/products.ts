import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase"; // ✅ Ensure Firebase is correctly initialized
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}