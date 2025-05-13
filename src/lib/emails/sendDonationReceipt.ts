// src/lib/emails/sendDonationReceipt.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendDonationReceipt({
  to,
  name,
  amount,
  reference,
  date,
  receiptId,
}: {
  to: string;
  name: string;
  amount: string;
  reference: string;
  date: string;
  receiptId: string;
}) {
  try {
    await resend.emails.send({
      from: "MMC Donations <donate@manchestermuridcommunity.org>",
      to,
      subject: "Your MMC Donation Receipt",
      text: `
Thank you, ${name}!

We’ve received your donation.

Reference: ${reference}
Amount: £${amount}
Date: ${date}
Receipt ID: ${receiptId}

May Allah reward you abundantly.

— Manchester Murid Community
      `.trim(),
    });
    console.log(`📧 Donor receipt sent to ${to}`);
  } catch (err) {
    console.error("❌ Failed to send donor receipt:", err);
  }
}