import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, customerData, shippingData, cartItems, subtotal, shippingCost, total } = body;

    // 🛠 Generate PDF
    const doc = new PDFDocument();
    const filePath = path.join("/tmp", `receipt-${orderId}.pdf`);
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // 📝 Receipt Header
    doc.fontSize(18).text("Order Receipt", { align: "center" });
    doc.moveDown();
    
    // 🏷 Order Info
    doc.fontSize(12).text(`Order ID: ${orderId}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    // 🧑 Customer Info
    doc.text(`Customer: ${customerData.name}`);
    doc.text(`Email: ${customerData.email}`);
    doc.text(`Phone: ${customerData.phone}`);
    doc.moveDown();

    // 🚚 Shipping Info
    doc.text("Shipping Address:");
    doc.text(`${shippingData.address}, ${shippingData.city}, ${shippingData.postcode}, ${shippingData.country}`);
    doc.moveDown();

    // 📦 Order Items
    doc.text("Items Purchased:");
    cartItems.forEach((item: any) => {
      doc.text(`${item.name} (x${item.quantity}) - £${(item.price * item.quantity).toFixed(2)}`);
    });
    doc.moveDown();

    // 💰 Totals (✅ Fixed)
    doc.text(`Subtotal: £${subtotal.toFixed(2)}`);
    doc.text(`Shipping Cost: £${shippingCost.toFixed(2)}`);
    doc.font("Helvetica-Bold").text(`Total: £${total.toFixed(2)}`);
    doc.font("Helvetica"); // Reset font back to normal

    // ✅ Finish PDF
    doc.end();

    return NextResponse.json({ url: `/api/receipt/download?orderId=${orderId}` });

  } catch (error) {
    console.error("Error generating receipt:", error);
    return NextResponse.json({ error: "Failed to generate receipt" }, { status: 500 });
  }
}