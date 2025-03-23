import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
  }

  const filePath = path.join("/tmp", `receipt-${orderId}.pdf`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
  }

  return new NextResponse(fs.readFileSync(filePath), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="receipt-${orderId}.pdf"`,
    },
  });
}