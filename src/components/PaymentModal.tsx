"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

// Define Props
interface PaymentModalProps {
  method: string;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ method, onClose }) => {
  const [copied, setCopied] = useState(false);

  const bankDetails = {
    sortCode: "30 99 50",
    accountNumber: "43330460",
    accountName: "Manchester Murid Community",
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-600 hover:text-red-500" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-primary mb-4">
          {method === "bankTransfer" ? "Bank Transfer Details" : "Cash Payment Instructions"}
        </h2>

        {/* Bank Transfer Details */}
        {method === "bankTransfer" && (
          <div className="text-lg">
            <p>
              <strong>Sort Code:</strong> {bankDetails.sortCode}{" "}
              <button onClick={() => handleCopy(bankDetails.sortCode)} className="ml-2 text-gold">
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </p>
            <p>
              <strong>Account Number:</strong> {bankDetails.accountNumber}{" "}
              <button onClick={() => handleCopy(bankDetails.accountNumber)} className="ml-2 text-gold">
                <FontAwesomeIcon icon={faCopy} />
              </button>
            </p>
            <p>
              <strong>Account Name:</strong> {bankDetails.accountName}
            </p>
            <p className="text-sm text-gray-500 mt-3">Please use your name as a reference.</p>
          </div>
        )}

        {/* Cash Payment Instructions */}
        {method === "cash" && (
          <div className="text-lg">
            <p>Come to the weekly <strong>Daahira on Mondays</strong>.</p>
            <p>Or call <strong className="text-primary">+44 754 475547</strong> for details.</p>
          </div>
        )}

        {/* Close Button */}
        <button onClick={onClose} className="mt-6 bg-primary text-white px-6 py-2 rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;