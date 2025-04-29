'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Truck, MapPin, PackageSearch, FileDown } from 'lucide-react';

export default function SuccessPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const router = useRouter();
  const sessionId = searchParams.session_id;

  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
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
          setError(data.error || 'Failed to retrieve order.');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  const handleDownloadReceipt = async () => {
    if (!sessionId) return;

    setDownloading(true);
    try {
      const res = await fetch(`/api/receipt/${sessionId}`);
      if (!res.ok) throw new Error('Failed to fetch receipt.');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${sessionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('❌ Receipt download failed:', err);
      alert('Unable to download receipt. Please try again later.');
    } finally {
      setDownloading(false);
    }
  };

  const { metadata, customer_email } = sessionData || {};
  const name = metadata?.['Customer Name'] || 'N/A';
  const address = metadata?.['Shipping Address'] || 'N/A';
  const method = metadata?.['Shipping Method'] || 'Standard Delivery';
  const total = metadata?.['Total Paid'] || '0.00';
  const orderId = metadata?.['Order ID'] || 'N/A';

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
        {error || 'Unable to load your order.'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightBg flex justify-center items-center px-4 py-12">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-8">
        {/* Header */}
        <div className="text-center mb-10">
          <CheckCircle className="mx-auto h-16 w-16 text-primary" />
          <h1 className="text-3xl font-heading font-bold text-primary mt-4">
            Thank you!
          </h1>
          <p className="text-gray-700 mt-2">
            Your order was successful. A confirmation has been sent to:
          </p>
          <p className="text-darkText font-medium mt-1">{customer_email}</p>
          <p className="text-xs text-gray-500 mt-1">Order ID: {orderId}</p>
        </div>

        <hr className="border-gray-200 mb-10" />

        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700 mb-10">
          <div>
            <h2 className="text-base font-semibold text-primary flex items-center gap-2 mb-3">
              <Truck className="w-5 h-5" /> Delivery Summary
            </h2>
            <p className="flex items-start gap-2 mb-3">
              <Truck className="w-4 h-4 mt-1 text-gray-500" />
              <span>
                <strong>Delivery Method:</strong> {method}
              </span>
            </p>
            <p className="flex items-start gap-2 mb-3">
              <MapPin className="w-4 h-4 mt-1 text-gray-500" />
              <span>
                <strong>Address:</strong>
                <br />
                <span className="whitespace-pre-line">{address}</span>
              </span>
            </p>
            <p className="flex items-center gap-2">
              💰 <strong>Total Paid:</strong> £{total}
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-primary flex items-center gap-2 mb-3">
              <PackageSearch className="w-5 h-5" /> Products
            </h2>
            <p className="text-gray-600">
              You will find itemized details in your receipt.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => router.push('/shop')}
            className="w-full sm:w-auto bg-gold hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg shadow transition"
            aria-label="Continue Shopping"
          >
            Continue Shopping
          </button>
          <button
            onClick={handleDownloadReceipt}
            disabled={downloading}
            className="w-full sm:w-auto bg-primary hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
            aria-label="Download Receipt"
          >
            <FileDown className="w-4 h-4" />
            {downloading ? 'Preparing...' : 'Download Receipt'}
          </button>
        </div>
      </div>
    </div>
  );
}