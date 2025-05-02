"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const CancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="text-red-500 text-5xl mb-4"
        />
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Payment Canceled
        </h1>
        <p className="text-gray-700 mb-4">
          Your payment was not completed. If this was a mistake, you can try
          again or contact us for support.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
          >
            Back to Shop
          </Link>

          <Link
            href="/checkout"
            className="inline-block bg-gold text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition"
          >
            Retry Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;