import { NextResponse } from "next/server";
import { sendDonationReceipt } from "@/lib/emails/sendDonationReceipt";
import { sendAdminNotification } from "@/lib/emails/sendAdminNotification";

export async function GET() {
  try {
    const fakeData = {
      to: "bashirseye@gmail.com", // ✅ Replace with your real test email
      name: "Test Donor",
      amount: "25.00",
      reference: "Support the KST Centre Project.",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit", month: "long", year: "numeric",
      }),
      receiptId: "TEST-EMAIL-123",
    };

    await Promise.all([
      sendDonationReceipt(fakeData),
    //   sendAdminNotification({ ...fakeData, email: fakeData.to }),
    ]);

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("❌ Test email failed:", err);
    return NextResponse.json({ status: "error", message: String(err) }, { status: 500 });
  }
}