import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  try {
    // ✅ Extract order details from the request
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId") || "N/A";
    const customerName = searchParams.get("name") || "Unknown";
    const customerEmail = searchParams.get("email") || "N/A";
    const customerPhone = searchParams.get("phone") || "N/A";
    const address = searchParams.get("address") || "N/A";
    const city = searchParams.get("city") || "N/A";
    const postcode = searchParams.get("postcode") || "N/A";
    const shippingCost = parseFloat(searchParams.get("shippingCost") || "0");
    const total = parseFloat(searchParams.get("total") || "0");

    // ✅ Decode and Parse Cart Items (Fix Special Characters)
    const cartItemsJSON = searchParams.get("cartItems");
    const cartItems = cartItemsJSON ? JSON.parse(decodeURIComponent(cartItemsJSON)) : [];

    // ✅ Debugging: Log incoming order data
    console.log("📥 Incoming Order Data:", {
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      postcode,
      shippingCost,
      total,
      cartItems,
    });

    // ✅ Load Logo Image (Ensure logo is in `public/images/`)
    const logoPath = path.join(process.cwd(), "public/images/logo.png");
    if (!fs.existsSync(logoPath)) {
      console.warn("⚠️ Logo not found at", logoPath);
    }
    const logoBytes = fs.existsSync(logoPath) ? new Uint8Array(fs.readFileSync(logoPath)) : null;

    // ✅ Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([600, 800]); // Default page size
    let { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // ✅ Embed Logo (if available)
    if (logoBytes) {
      const logoImage = await pdfDoc.embedPng(logoBytes);
      page.drawImage(logoImage, { x: 50, y: height - 80, width: 100, height: 50 });
    }

    let yPosition = height - 120;

    // ✅ Add Receipt Header
    page.drawText("Order Receipt", { x: 200, y: yPosition, size: 22, font, color: rgb(0, 0.2, 0.5) });
    yPosition -= 30;

    // ✅ Order Info
    page.drawText(`Order ID: ${orderId}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 20;
    page.drawText(`Customer: ${customerName}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 20;
    page.drawText(`Email: ${customerEmail}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 20;
    page.drawText(`Phone: ${customerPhone}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 30;

    // ✅ Shipping Info
    page.drawText("Shipping Details:", { x: 50, y: yPosition, size: 12, font, color: rgb(0, 0.1, 0.5) });
    yPosition -= 20;
    page.drawText(`Address: ${address}, ${city}, ${postcode}`, { x: 50, y: yPosition, size: 12, font });
    yPosition -= 30;

    // ✅ Order Items Header
    page.drawText("Purchased Items:", { x: 50, y: yPosition, size: 12, font, color: rgb(0, 0.1, 0.5) });
    yPosition -= 20;

    // ✅ Table Headers
    page.drawText("Item", { x: 50, y: yPosition, size: 10, font, color: rgb(0, 0, 0) });
    page.drawText("Qty", { x: 350, y: yPosition, size: 10, font, color: rgb(0, 0, 0) });
    page.drawText("Price", { x: 450, y: yPosition, size: 10, font, color: rgb(0, 0, 0) });
    yPosition -= 15;

    // ✅ Draw a line under table headers
    page.drawLine({
      start: { x: 50, y: yPosition },
      end: { x: 550, y: yPosition },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    yPosition -= 15;

    // ✅ Loop through Cart Items and Add Them to the Receipt
    cartItems.forEach((item: any) => {
      if (yPosition < 50) {
        page = pdfDoc.addPage([600, 800]); // Add new page if content exceeds
        yPosition = height - 50;
      }
      page.drawText(item.name, { x: 50, y: yPosition, size: 10, font, color: rgb(0, 0, 0) });
      page.drawText(`${item.quantity}`, { x: 360, y: yPosition, size: 10, font, color: rgb(0, 0, 0) });
      page.drawText(`£${(item.price * item.quantity).toFixed(2)}`, { x: 450, y: yPosition, size: 10, font, color: rgb(0, 0, 0) });
      yPosition -= 20;
    });

    yPosition -= 20;
    page.drawText(`Shipping Cost: £${shippingCost.toFixed(2)}`, { x: 50, y: yPosition, size: 12, font, color: rgb(0.5, 0, 0) });
    yPosition -= 20;
    page.drawText(`Total Paid: £${total.toFixed(2)}`, { x: 50, y: yPosition, size: 14, font, color: rgb(0, 0.5, 0) });

    // ✅ Save the PDF & return as response
    const pdfBytes = await pdfDoc.save();
    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=receipt.pdf",
      },
    });
  } catch (error) {
    console.error("❌ PDF Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate receipt" }, { status: 500 });
  }
}