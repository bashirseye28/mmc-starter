// src/lib/emails/sendAdminNotification.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendAdminNotification({
  name,
  email,
  amount,
  reference,
  frequency,
  date,
  receiptId,
}: {
  name: string;
  email: string;
  amount: string;
  reference: string;
  frequency: string;
  date: string;
  receiptId: string;
}) {
  try {
    await resend.emails.send({
      from: "MMC System <donate@manchestermuridcommunity.org>",
      to: "info@manchestermuridcommunity.org",
      subject: "✅ New Donation Received",
      text: `
New donation received:

Name: ${name}
Email: ${email}
Reference: ${reference}
Frequency: ${frequency}
Amount: £${amount}
Date: ${date}
Receipt ID: ${receiptId}
      `.trim(),
    });
    console.log(`📧 Admin notified about ${email}`);
  } catch (err) {
    console.error("❌ Failed to send admin notification:", err);
  }
}