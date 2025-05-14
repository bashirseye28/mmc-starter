"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  name: string;
  email?: string;
  message?: string;
  anonymous: boolean;
  amount: number;
  frequency: string;
  reference: string;
  onEdit: () => void;
  onConfirm: () => void;
};

const DonationReview: React.FC<Props> = ({
  name,
  email,
  message,
  anonymous,
  amount,
  frequency,
  reference,
  onEdit,
  onConfirm,
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-xl mx-auto border p-8 rounded-lg shadow text-center">
        {/* Header */}
        <h2 className="text-3xl font-bold mb-6">
          <span className="text-primary">Confirm</span>{" "}
          <span className="text-gold">Your Donation</span>
        </h2>

        {/* Summary */}
        <p className="text-lg text-gray-700 mb-4">
          You are donating{" "}
          <span className="font-bold text-primary">£{amount}</span>{" "}
          (<span className="capitalize">{frequency.toLowerCase()}</span>) toward
        </p>
        <p className="font-semibold text-primary break-words whitespace-pre-wrap text-lg mb-2">
          {reference}
        </p>

        {/* Details */}
        <div className="text-left text-sm space-y-2 mt-6 break-words whitespace-pre-wrap">
          {!anonymous && (
            <>
              <p>
                <span className="font-bold text-primary">Donor:</span> {name}
              </p>
              {email && (
                <p>
                  <span className="font-bold text-primary">Email:</span> {email}
                </p>
              )}
            </>
          )}
          <p>
            <span className="font-bold text-primary">Frequency:</span>{" "}
            {frequency}
          </p>
          <p>
            <span className="font-bold text-primary">Reference:</span>{" "}
            {reference}
          </p>
          {message && (
            <p>
              <span className="font-bold text-primary">Message:</span>{" "}
              {message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
          <button
            type="button"
            onClick={onEdit}
            className="w-full sm:w-auto border-2 border-primary text-primary px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Return
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto bg-gold text-black px-6 py-3 font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition"
          >
            Donate £{amount} Now
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Payments are securely processed via Stripe.
        </p>
      </div>
    </section>
  );
};

export default DonationReview;