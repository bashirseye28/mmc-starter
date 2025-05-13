// src/lib/emails/sendDonationReceipt.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface ReceiptEmailProps {
  to: string;
  name: string;
  amount: string;
  reference: string;
  date: string;
  receiptId: string;
}

export async function sendDonationReceipt({
  to,
  name,
  amount,
  reference,
  date,
  receiptId,
}: ReceiptEmailProps) {
  const message = `
BismiLlah,

Dear ${name},

Thank you for your generous donation to Manchester Murid Community.

Here are your donation details:

----------------------------------------
🧾 Receipt ID:      ${receiptId}
💷 Amount:          £${amount}
📌 Reference:       ${reference}
📅 Date:            ${date}
----------------------------------------

Your support helps us continue our mission of spiritual, educational, and community service.

May Allah reward you abundantly and increase you in all that is good.

Jazakum Allahu Khayran,  
— Manchester Murid Community

  `.trim();

  try {
    await resend.emails.send({
      from: "MMC Donations <donate@manchestermuridcommunity.org>",
      to,
      subject: "Your MMC Donation Receipt",
      text: message,
    });

    console.log(`📧 Text receipt email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send text-based receipt:", error);
  }
}