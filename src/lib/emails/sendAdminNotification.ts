// src/lib/emails/sendAdminNotification.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface AdminNotificationProps {
  name: string;
  email: string;
  amount: string;
  reference: string;
  frequency: string;
  date: string;
  receiptId: string;
}

export async function sendAdminNotification({
  name,
  email,
  amount,
  reference,
  frequency,
  date,
  receiptId,
}: AdminNotificationProps) {
  try {
    await resend.emails.send({
      from: "MMC Donations <info@manchestermuridcommunity.org>",
      to: ["admin@manchestermuridcommunity.org"], // 🔁 Replace or add multiple if needed
      subject: `✅ New MMC Donation Received - £${amount}`,
      text: `
A new donation has been successfully received.

Donor Name: ${name}
Donor Email: ${email}
Amount: £${amount}
Reference: ${reference}
Frequency: ${frequency}
Date: ${date}
Receipt ID: ${receiptId}

— MMC Stripe Webhook
      `.trim(),
    });

    console.log(`📨 Admin notified about donation from ${name}`);
  } catch (error) {
    console.error("❌ Failed to send admin notification email:", error);
  }
}