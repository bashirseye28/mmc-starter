"use client";

import { useState } from "react";
import { format } from "date-fns";
import { FaTimes, FaCopy } from "react-icons/fa";
import { Donation } from "./types";

interface Props {
  donation: Donation | null;
  onClose: () => void;
}

const DonationDetailsModal = ({ donation, onClose }: Props) => {
  const [copied, setCopied] = useState(false);

  if (!donation) return null;

  const {
    donorName,
    customer_email,
    amount_total,
    currency,
    status,
    reference,
    sessionId,
    created,
    source,
    metadata = {},
  } = donation;

  const {
    donor_name,
    donor_email,
    donation_reference,
    message,
  } = metadata;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-primary mb-4">Donation Details</h2>

        {/* Detail Fields */}
        <div className="space-y-3 text-sm">
          <DetailRow
            label="Donor Name"
            value={donorName || donor_name || "Anonymous"}
          />
          <DetailRow
            label="Email"
            value={customer_email || donor_email || "—"}
          />
          <DetailRow
            label="Amount"
            value={
              typeof amount_total === "number"
                ? `£${(amount_total / 100).toFixed(2)} ${currency?.toUpperCase() || ""}`
                : "—"
            }
          />
          <DetailRow label="Status" value={status || "—"} />
          <DetailRow
            label="Reference"
            value={reference || donation_reference || "—"}
          />
          {message && (
            <DetailRow label="Message" value={message} />
          )}
          <DetailRow
            label="Date"
            value={
              created?.toDate
                ? format(created.toDate(), "dd MMM yyyy, p")
                : "—"
            }
          />
          {sessionId && (
            <DetailRow
              label="Session ID"
              value={
                <div className="flex items-center gap-2 truncate max-w-[200px]">
                  <span className="truncate">{sessionId}</span>
                  <button
                    onClick={() => handleCopy(sessionId)}
                    className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    <FaCopy />
                  </button>
                  {copied && (
                    <span className="text-green-600 text-xs">Copied!</span>
                  )}
                </div>
              }
            />
          )}
          {source && <DetailRow label="Source" value={source} />}
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="font-medium text-gray-700">{label}</span>
    <span className="text-gray-600 text-right truncate">{value}</span>
  </div>
);

export default DonationDetailsModal;