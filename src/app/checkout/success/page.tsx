'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Truck, MapPin, FileDown } from 'lucide-react';

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        setError('Missing session ID.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/stripe/session/${sessionId}`);
        const data = await res.json();

        if (res.ok) {
          setSessionData(data);
        } else {
          setError(data.error || 'Unable to fetch order.');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  const handleDownloadReceipt = () => {
    if (!sessionId) return;

    const link = document.createElement('a');
    link.href = `/api/receipt/${sessionId}`;
    link.target = '_blank';
    link.download = `receipt-${sessionId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const { metadata, customer_email } = sessionData || {};
  const {
    'Customer Name': name,
    'Shipping Address': address,
    'Shipping Method': method,
    'Total Paid': total,
    'Order ID': orderId,
  } = metadata || {};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-primary text-sm">
        Loading your order...
      </div>
    );
  }

  if (error || !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-sm">
        {error || 'Unable to load order details.'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightBg flex justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-8">
        <div className="text-center">
          <CheckCircle className="mx-auto h-14 w-14 text-green-500" />
          <h1 className="text-3xl font-heading font-bold text-primary mt-4">Thank you!</h1>
          <p className="text-gray-700 mt-2">
            Your order was successful. A confirmation email has been sent to:
          </p>
          <p className="text-sm font-medium text-darkText mt-1">{customer_email}</p>
          {orderId && (
            <p className="text-xs text-gray-500 mt-1">Order ID: {orderId}</p>
          )}
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
            <Truck className="w-5 h-5" /> Order Summary
          </h2>

          <div className="flex items-start gap-2 text-sm text-gray-700">
            <Truck className="w-4 h-4 mt-1 text-gray-500" />
            <div>
              <strong>Delivery:</strong> {method || 'Standard Delivery'}
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 mt-1 text-gray-500" />
            <div>
              <strong>Address:</strong>
              <div className="whitespace-pre-line">{address}</div>
            </div>
          </div>

          {total && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-yellow-600 font-bold">£</span>
              <strong>Total Paid:</strong> {total}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/shop')}
            className="w-full sm:w-auto bg-gold hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg shadow transition"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleDownloadReceipt}
            className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white transition font-medium py-2 px-6 rounded-lg flex items-center gap-2"
          >
            <FileDown className="w-4 h-4" />
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;