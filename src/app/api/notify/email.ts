import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { orderId, name, email, total, items } = await req.json();

    // 1️⃣ Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2️⃣ Email Content
    const mailOptions = {
      from: `"Shop Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL, // Admin email from .env
      subject: `🛒 New Order: ${orderId}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Customer:</strong> ${name} (${email})</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total:</strong> £${total}</p>
        <h3>Items Ordered:</h3>
        <ul>
          ${items
            .map((item: any) => `<li>${item.name} x${item.quantity} - £${item.price}</li>`)
            .join("")}
        </ul>
        <p><a href="http://localhost:3000/admin/orders">View Order</a></p>
      `,
    };

    // 3️⃣ Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email." });
  }
}