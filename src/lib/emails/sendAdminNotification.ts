import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface AdminNotificationProps {
  name: string;
  email: string;
  amount: string;
  reference: string;
  date: string;
  receiptId: string;
  frequency: string;
}

export async function sendAdminNotification({
  name,
  email,
  amount,
  reference,
  date,
  receiptId,
  frequency,
}: AdminNotificationProps) {
  try {
    await resend.emails.send({
      from: "MMC Donations <notify@manchestermuridcommunity.org>",
      to: "info@manchestermuridcommunity.org", // Change if needed
      subject: "✅ New MMC Donation Received",
      text: `
A new donation has been received.

Donor Name: ${name}
Donor Email: ${email}
Amount: £${amount}
Frequency: ${frequency}
Tier: ${reference}
Date: ${date}
Receipt ID: ${receiptId}

Please log in to the dashboard for full details.
      `.trim(),
    });

    console.log(`📨 Admin notified for donation by ${name}`);
  } catch (error) {
    console.error("❌ Failed to notify admin:", error);
  }
}