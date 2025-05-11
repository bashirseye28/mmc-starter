"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import jsPDF from "jspdf";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [donationDetails, setDonationDetails] = useState<{
    donorName: string;
    donorEmail: string;
    donorPhone?: string;
    cause: string;
    amount: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    const donorName = searchParams.get("donor_name") || "Anonymous";
    const donorEmail = searchParams.get("donor_email") || "donor@manchestermuridcommunity.org";
    const donorPhone = searchParams.get("donor_phone") || "N/A";
    const cause = searchParams.get("cause") || "General Donation";
    const amount = searchParams.get("amount") || "10.00";
    const date = format(new Date(), "PPPpp");

    setDonationDetails({
      donorName,
      donorEmail,
      donorPhone,
      cause,
      amount,
      date,
    });
  }, [searchParams]);

  const handleDownload = async () => {
    if (!donationDetails) return;

    const doc = new jsPDF();

    const logoUrl = "/images/logo.png";
    const logoImg = await fetch(logoUrl)
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          })
      );

    doc.addImage(logoImg as string, "PNG", 85, 10, 40, 40);

    let y = 60;
    doc.setFontSize(20).setFont("helvetica", "bold");
    doc.text("Donation Receipt", 105, y, { align: "center" });

    y += 15;
    doc.setFontSize(18).text("Manchester Murid Community", 20, y);

    y += 9;
    doc.setFontSize(12).setFont("helvetica", "normal");
    doc.text("Charity No: 1194666", 20, y);
    y += 7;
    doc.text("Email: contact@manchestermuridcommunity.org", 20, y);
    y += 7;
    doc.text("Website: https://manchestermuridcommunity.org", 20, y);

    y += 10;
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);

    y += 15;
    doc.setFont("helvetica", "bold").text("Donor Information:", 20, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${donationDetails.donorName}`, 20, y);
    y += 7;
    doc.text(`Email: ${donationDetails.donorEmail}`, 20, y);
    y += 7;
    doc.text(`Phone: ${donationDetails.donorPhone}`, 20, y);

    y += 10;
    doc.setFont("helvetica", "bold").text("Donation Details:", 20, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text(`Cause: ${donationDetails.cause}`, 20, y);
    y += 7;
    doc.text(`Amount: £${donationDetails.amount}`, 20, y);
    y += 7;
    doc.text(`Date: ${donationDetails.date}`, 20, y);

    y += 15;
    doc.setLineWidth(0.3);
    doc.line(20, y, 190, y);

    y += 12;
    doc.setFontSize(11).setFont("times", "italic");
    doc.text("May Allah reward you abundantly for your generosity.", 105, y, {
      align: "center",
    });

    y += 15;
    doc.setFontSize(9).setFont("helvetica", "normal");
    doc.text(
      "This is your official donation receipt. Thank you for supporting Manchester Murid Community.",
      105,
      y,
      { align: "center" }
    );

    doc.save("mmc-donation-receipt.pdf");
  };

  if (!donationDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <p className="text-gray-600 text-lg">Loading your receipt...</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-6 bg-lightBg min-h-screen flex flex-col items-center justify-center text-center">
      <div className="bg-white border shadow-xl rounded-2xl p-8 max-w-xl w-full relative">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="Manchester Murid Community Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-primary mb-2">
          Thank You for Your Donation!
        </h1>
        <p className="text-gray-700 mb-6 font-body">
          May Allah reward you abundantly. If you have any questions, feel free to{" "}
          <a
            href="mailto:contact@manchestermuridcommunity.org"
            className="underline text-primary hover:text-gold transition"
          >
            contact us
          </a>
          .
        </p>

        <div className="text-left text-sm text-gray-800 font-body space-y-3 border-t pt-4">
          <p><strong>Donor Name:</strong> {donationDetails.donorName}</p>
          <p><strong>Email:</strong> {donationDetails.donorEmail}</p>
          <p><strong>Phone:</strong> {donationDetails.donorPhone}</p>
          <p><strong>Cause:</strong> {donationDetails.cause}</p>
          <p><strong>Amount:</strong> £{donationDetails.amount}</p>
          <p><strong>Date:</strong> {donationDetails.date}</p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleDownload}
            className="bg-primary text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-[#005f5f] transition"
          >
            Download Receipt
          </button>
          <a
            href="/"
            className="inline-block bg-gray-100 border px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
          >
            Return Home
          </a>
        </div>
      </div>
    </section>
  );
}