import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { db } from "@/app/lib/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // ✅ Fetch order from Firestore
    const orderRef = doc(db, "orders", orderId);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = orderSnap.data();

    const docPdf = new PDFDocument({ size: "A4", margin: 50 });

    const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
      const chunks: any[] = [];
      docPdf.on("data", (chunk) => chunks.push(chunk));
      docPdf.on("end", () => resolve(Buffer.concat(chunks)));
      docPdf.on("error", reject);

      // ✅ PDF content
      docPdf.fontSize(20).text(`🧾 RECEIPT`, { align: "center" });
      docPdf.moveDown();
      docPdf.fontSize(12).text(`Order ID: ${order.orderId}`);
      docPdf.text(`Customer: ${order.name}`);
      docPdf.text(`Email: ${order.email}`);
      docPdf.text(`Phone: ${order.phone || "N/A"}`);
      docPdf.moveDown();
      docPdf.text(`----------------------------------------`);

      order.cartItems.forEach((item: any) => {
        docPdf.text(
          `${item.quantity}x ${item.name} — £${item.price.toFixed(2)}`
        );
      });

      docPdf.text(`----------------------------------------`);
      docPdf.font("Helvetica-Bold").text(
        `Shipping: £${order.shippingCost?.toFixed(2) || "0.00"}`,
        { align: "right" }
      );
      docPdf.text(`TOTAL: £${order.total.toFixed(2)}`, { align: "right" });

      docPdf.end();
    });

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${orderId}.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("❌ PDF error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}