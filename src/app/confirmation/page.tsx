"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faDownload, faHome } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

const Confirmation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ Get amount & method from URL parameters
  const amount = searchParams.get("amount") || "N/A";
  const method = searchParams.get("method") || "N/A";

  // ✅ Function to Generate & Download PDF Receipt
  const handleDownloadReceipt = () => {
    const doc = new jsPDF();

    // ✅ Set Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Donation Receipt", 20, 20);

    // ✅ Add Organization Name
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("Manchester Murid Community", 20, 30);

    // ✅ Draw a Line
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // ✅ Donation Details
    doc.setFontSize(12);
    doc.text(`Thank you for your generous donation!`, 20, 45);
    doc.text(`Donation Amount: £${amount}`, 20, 55);
    doc.text(`Payment Method: ${method.toUpperCase()}`, 20, 65);
    doc.text(`Transaction Date: ${new Date().toLocaleDateString()}`, 20, 75);

    // ✅ Footer
    doc.setFontSize(10);
    doc.text("This receipt serves as proof of your donation.", 20, 95);
    doc.text("Contact us for any queries: info@manchestermuridcommunity.org", 20, 105);

    // ✅ Save & Download PDF
    doc.save("Donation_Receipt.pdf");
  };

  return (
    <section className="py-16 bg-lightBg text-center">
      <div className="container mx-auto px-6 max-w-3xl">
        {/* ✅ Success Icon */}
        <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-gold mb-4" />

        {/* ✅ Thank You Message */}
        <h2 className="text-3xl sm:text-4xl font-bold font-heading">
          <span className="text-primary">Thank You for Your Donation!</span>
        </h2>
        <p className="text-lg text-darkText mt-3">
          We appreciate your generous support. Your donation of <span className="font-bold">£{amount}</span> via{" "}
          <span className="font-bold text-primary">{method.toUpperCase()}</span> has been received.
        </p>

        {/* ✅ Transaction Details */}
        <div className="mt-6 p-4 bg-white border border-gray-300 rounded-lg text-center">
          <h3 className="text-lg font-bold text-primary">Transaction Details</h3>
          <p className="text-md text-darkText">Donation Amount: <span className="font-bold">£{amount}</span></p>
          <p className="text-md text-darkText">Payment Method: <span className="font-bold">{method.toUpperCase()}</span></p>
        </div>

        {/* ✅ Download Receipt Button */}
        <div className="mt-6 flex justify-center">
          <motion.button
            className="px-8 py-3 rounded-lg bg-primary text-white font-semibold shadow-md transition flex items-center justify-center gap-2 hover:bg-darkPrimary"
            onClick={handleDownloadReceipt}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faDownload} className="text-white" />
            Download Receipt
          </motion.button>
        </div>

        {/* ✅ Back to Home Button */}
        <div className="mt-4 flex justify-center">
          <motion.button
            className="px-8 py-3 rounded-lg bg-gray-600 text-white font-semibold shadow-md transition flex items-center justify-center gap-2 hover:bg-gray-800"
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faHome} className="text-white" />
            Back to Home
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Confirmation;