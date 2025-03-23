import { NextRequest, NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { Buffer } from "buffer";

// GET /api/pdf?orderId=...&name=...&cartItems=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId") || "N/A";
    const name = searchParams.get("name") || "Customer";
    const email = searchParams.get("email") || "";
    const phone = searchParams.get("phone") || "";
    const address = searchParams.get("address") || "";
    const city = searchParams.get("city") || "";
    const postcode = searchParams.get("postcode") || "";
    const shippingCost = parseFloat(searchParams.get("shippingCost") || "0");
    const total = parseFloat(searchParams.get("total") || "0");
    const cartItemsRaw = searchParams.get("cartItems") || "[]";
    const cartItems = JSON.parse(decodeURIComponent(cartItemsRaw));

    const doc = new PDFDocument();
    const chunks: Uint8Array[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {});

    // ✅ PDF Content
    doc.fontSize(18).text("🧾 Order Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Order ID: ${orderId}`);
    doc.text(`Name: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Phone: ${phone}`);
    doc.text(`Address: ${address}, ${city}, ${postcode}`);
    doc.text(`Shipping: £${shippingCost.toFixed(2)}`);
    doc.moveDown();

    doc.fontSize(14).text("Items:");
    cartItems.forEach((item: any) => {
      doc.text(`- ${item.name} x${item.quantity} (£${item.price})`);
    });

    doc.moveDown();
    doc.fontSize(14).fillColor("black").text(`Total: £${total.toFixed(2)}`, {
      underline: true
    });

    doc.end();

    // ✅ Wait for PDF to finish rendering
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      doc.on("end", () => {
        resolve(Buffer.concat(chunks));
      });
      doc.on("error", reject);
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${orderId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("❌ PDF generation error:", error);
    return NextResponse.json({ error: "Failed to generate receipt." }, { status: 500 });
  }
}