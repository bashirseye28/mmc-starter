import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

const gmailEmail = process.env.EMAIL_ADMIN || "";
const gmailPassword = process.env.EMAIL_PASSWORD || "";
const notifyEmail = process.env.EMAIL_NOTIFY || "";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const generateEmailContent = (order: any) => {
  return `
    <h2>🛒 New Order Received</h2>
    <p><strong>Order ID:</strong> ${order.orderId}</p>
    <p><strong>Customer:</strong> ${order.name} (${order.email})</p>
    <p><strong>Phone:</strong> ${order.phone}</p>
    <p><strong>Address:</strong> ${order.address}, ${order.city}, ${order.postcode}</p>
    <p><strong>Total:</strong> £${order.total}</p>
    <p><strong>Items:</strong></p>
    <ul>
      ${order.cartItems
        .map(
          (item: any) =>
            `<li>${item.name} x${item.quantity} - £${item.price.toFixed(2)}</li>`
        )
        .join("")}
    </ul>
  `;
};

export const sendOrderNotification = onDocumentCreated("orders/{orderId}", async (event) => {
  const order = event.data?.data();

  if (!order) {
    logger.error("No order data found.");
    return;
  }

  const mailOptions = {
    from: `Orders <${gmailEmail}>`,
    to: notifyEmail,
    subject: `🛍 New Order: ${order.orderId}`,
    html: generateEmailContent(order),
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.log("✅ Admin notified via email.");
  } catch (error) {
    logger.error("❌ Email notification failed:", error);
  }
});