"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faCheckCircle,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export interface SuccessReceiptProps {
  receiptId: string;
  donorName: string;
  donorEmail: string;
  reference: string;
  amount: number;
  frequency: string;
  method: string;
  date: string;
  title?: string;
  returnHref?: string;
}

const SuccessReceipt: React.FC<SuccessReceiptProps> = ({
  receiptId,
  donorName,
  donorEmail,
  reference,
  amount,
  frequency,
  method,
  date,
  title = "Thank You for Your Generosity!",
  returnHref = "/",
}) => {
  const router = useRouter();

  const generatePDF = async () => {
    const doc = new jsPDF();
    const logoUrl =
      "https://res.cloudinary.com/dnmoy5wua/image/upload/v1742051469/logo_ys5gk6.png";

    const imgBlob = await fetch(logoUrl).then((res) => res.blob());
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imgBlob);
    });

    doc.addImage(base64, "PNG", 85, 10, 40, 40);
    let y = 60;

    doc.setFont("helvetica", "bold").setFontSize(18);
    doc.text("Donation Receipt", 105, y, { align: "center" });

    y += 10;
    doc.setDrawColor(180);
    doc.line(20, y, 190, y);
    y += 10;

    const fields = [
      ["Receipt ID", receiptId],
      ["Donor Name", donorName],
      ["Donor Email", donorEmail],
      ["Donation Tier", reference],
      ["Amount", `£${amount.toFixed(2)}`],
      ["Frequency", frequency],
      ["Payment Method", method],
      ["Date", date],
    ];

    doc.setFont("courier", "normal").setFontSize(12);
    fields.forEach(([label, value]) => {
      doc.text(`${label}:`, 25, y);
      doc.text(value, 90, y);
      y += 8;
    });

    y += 5;
    doc.setDrawColor(180);
    doc.line(20, y, 190, y);
    y += 10;

    doc.setFont("times", "italic").setFontSize(11);
    doc.text("May Allah reward you abundantly for your support.", 105, y, {
      align: "center",
    });

    y += 12;
    doc.setFont("helvetica", "bold").setFontSize(10);
    doc.text("Manchester Murid Community", 105, y, { align: "center" });
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.text("Registered Charity No: 1194666", 105, y, { align: "center" });
    y += 5;
    doc.text("donate@manchestermuridcommunity.org | +44 7541 475 547", 105, y, {
      align: "center",
    });

    doc.save(`MMC_Receipt_${receiptId}.pdf`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 relative">
      <Confetti recycle={false} numberOfPieces={300} />
      <div className="bg-white shadow-xl p-10 rounded-lg text-center max-w-lg border border-gray-200">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-primary"
        >
          <FontAwesomeIcon icon={faCheckCircle} className="text-6xl" />
        </motion.div>

        <h2 className="text-3xl font-bold text-primary mt-4">
          {title.includes("Thank") ? (
            <>
              Thank You for Your <span className="text-gold">Generosity!</span>
            </>
          ) : (
            title
          )}
        </h2>
        <p className="text-gray-600 mt-2">
          Your donation is making a real difference. We deeply appreciate your support!
        </p>

        <motion.div
          className="mt-6 bg-white p-5 rounded-lg border shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold text-primary text-center">
            <span className="text-gold">Donation</span> Summary
          </h3>

          <div className="mt-3 space-y-2 text-left font-body text-darkText">
            <p><strong>Receipt ID:</strong> {receiptId}</p>
            <p><strong>Donor:</strong> {donorName}</p>
            <p><strong>Email:</strong> {donorEmail}</p>
            <p><strong>Donation Tier:</strong> {reference}</p>
            <p><strong>Amount:</strong> £{amount.toFixed(2)}</p>
            <p><strong>Frequency:</strong> {frequency}</p>
            <p><strong>Payment Method:</strong> {method}</p>
            <p><strong>Date:</strong> {date}</p>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button
            onClick={generatePDF}
            disabled={!amount}
            className={`px-6 py-3 ${
              amount ? "bg-gray-700 hover:bg-gray-900" : "bg-gray-400 cursor-not-allowed"
            } text-white font-semibold rounded-lg shadow-md transition flex items-center justify-center gap-2`}
          >
            <FontAwesomeIcon icon={faFilePdf} />
            Download Receipt (PDF)
          </button>
        </motion.div>

        <motion.div
          className="mt-6 flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button
            onClick={() => router.push(returnHref)}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-darkPrimary transition flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Return to Homepage
          </button>
          <button
            onClick={() => router.push("/donate")}
            className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition flex items-center justify-center gap-2"
          >
            Donate Again
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default SuccessReceipt;