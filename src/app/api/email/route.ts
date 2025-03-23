import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// ✅ Define TypeScript Types
interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// ✅ Email API Function
export async function POST(req: Request) {
  try {
    // ✅ Parse Request Body
    const { orderId, customerInfo, cartItems, totalAmount, paymentMethod } = await req.json();

    // ✅ Ensure Required Data is Present
    if (!orderId || !customerInfo || !cartItems || !totalAmount || !paymentMethod) {
      return NextResponse.json({ error: "Missing required order details" }, { status: 400 });
    }

    console.log("✅ Email API Received Order Data:", { orderId, customerInfo, totalAmount });

    // ✅ Configure Nodemailer Transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587, // Standard SMTP port
      secure: false, // false for TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("✅ Nodemailer Transport Configured");

    // ✅ Generate PDF Receipt
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 750]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("Order Receipt", { x: 200, y: height - 50, size: 20, font, color: rgb(0, 0, 0) });
    page.drawText(`Order ID: ${orderId}`, { x: 50, y: height - 100, size: 12, font });
    page.drawText(`Customer: ${customerInfo.name}`, { x: 50, y: height - 120, size: 12, font });
    page.drawText(`Email: ${customerInfo.email}`, { x: 50, y: height - 140, size: 12, font });
    page.drawText(`Phone: ${customerInfo.phone}`, { x: 50, y: height - 160, size: 12, font });

    let yPosition = height - 200;

    // ✅ Fix Type Error: Explicitly Define Type in `.forEach()`
    cartItems.forEach((item: CartItem, index: number) => {
      page.drawText(`${index + 1}. ${item.name} x${item.quantity} - £${item.price.toFixed(2)}`, {
        x: 50, y: yPosition, size: 10, font, color: rgb(0, 0, 0)
      });
      yPosition -= 20;
    });

    page.drawText(`Total Paid: £${totalAmount.toFixed(2)}`, { x: 50, y: yPosition - 20, size: 12, font });

    const pdfBytes = await pdfDoc.save();
    const pdfAttachment = Buffer.from(pdfBytes);

    console.log("✅ PDF Receipt Generated");

    // ✅ Email Content
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #007676;">Thank you for your order, ${customerInfo.name}!</h2>
        <p>Your order <strong>#${orderId}</strong> has been successfully processed.</p>
        <p><strong>Total Paid:</strong> £${totalAmount.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <p>We've attached your invoice for reference.</p>
      </div>
    `;

    // ✅ Send Email with PDF Attachment
    const mailResponse = await transporter.sendMail({
      from: `"Manchester Murid Community" <${process.env.EMAIL_FROM}>`,
      to: customerInfo.email,
      subject: `Order Confirmation - Order #${orderId}`,
      html: emailHTML,
      attachments: [
        {
          filename: "receipt.pdf",
          content: pdfAttachment,
          contentType: "application/pdf",
        },
      ],
    });

    console.log("✅ Email Sent Successfully:", mailResponse.messageId);

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email Sending Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}