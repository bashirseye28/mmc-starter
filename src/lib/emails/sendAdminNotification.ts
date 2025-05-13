import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export interface AdminNotificationProps {
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
      from: "MMC Donations <notify@manchestermuridcommunity.org>",
      to: "info@manchestermuridcommunity.org", // ✅ Replace with actual admin address(es)
      subject: `📥 New Donation Received – ${name}`,
      text: `
A new donation has been received.

Donor Name: ${name}
Donor Email: ${email}
Amount: £${amount}
Reference: ${reference}
Frequency: ${frequency}
Date: ${date}
Receipt ID: ${receiptId}

– MMC Web System
      `.trim(),
    });
    console.log("📧 Admin notification sent");
  } catch (err) {
    console.error("❌ Failed to send admin email:", err);
  }
}