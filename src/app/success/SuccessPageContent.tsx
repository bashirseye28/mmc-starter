'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
  faCheckCircle,
  faFilePdf,
  faEnvelope,
  faMoneyBillWave,
  faCalendarAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import Confetti from 'react-confetti';

export default function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [donationDetails, setDonationDetails] = useState({
    receiptId: '',
    amount: 0,
    frequency: 'One-time',
    method: 'Unknown',
    donorName: 'Anonymous Donor',
    donorEmail: 'Not Provided',
    reference: 'General Donation',
    date: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  });

  useEffect(() => {
    if (!sessionId) return;

    const fetchDonationDetails = async () => {
      try {
        const response = await fetch(`/api/daahira/donate?session_id=${sessionId}`);
        const data = await response.json();

        if (response.ok) {
          const cleanReference = data.donation_reference?.trim();
          setDonationDetails({
            receiptId: data.receipt_id || sessionId.slice(0, 10).toUpperCase() || 'N/A',
            amount: parseFloat(data.donation_amount || '0'),
            frequency: data.donation_frequency || 'One-time',
            method: Array.isArray(data.payment_method_types)
              ? data.payment_method_types[0]?.toUpperCase() || 'Unknown'
              : 'Unknown',
            donorName: data.donor_name || 'Anonymous Donor',
            donorEmail: data.donor_email || 'Not Provided',
            reference: cleanReference && cleanReference.length > 2 ? cleanReference : 'General Donation',
            date: new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }),
          });
        } else {
          console.error('❌ Failed to fetch donation details:', data.error);
        }
      } catch (error) {
        console.error('❌ Error fetching donation details:', error);
      }
    };

    fetchDonationDetails();
  }, [sessionId]);

  const generatePDF = async () => {
    const doc = new jsPDF();
    const logoUrl = 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1742051469/logo_ys5gk6.png';

    const imgBlob = await fetch(logoUrl).then((res) => res.blob());
    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(imgBlob);
    });

    doc.addImage(base64, 'PNG', 85, 10, 40, 40);
    let y = 60;
    doc.setFont('helvetica', 'bold').setFontSize(18);
    doc.text('Donation Receipt', 105, y, { align: 'center' });

    y += 10;
    doc.setDrawColor(180);
    doc.line(20, y, 190, y);
    y += 10;

    const fields = [
      ['Receipt ID', donationDetails.receiptId],
      ['Donor Name', donationDetails.donorName],
      ['Donor Email', donationDetails.donorEmail],
      ['Reference', donationDetails.reference],
      ['Amount', `£${donationDetails.amount.toFixed(2)}`],
      ['Frequency', donationDetails.frequency],
      ['Payment Method', donationDetails.method],
      ['Date', donationDetails.date],
    ];

    doc.setFont('courier', 'normal').setFontSize(12);
    fields.forEach(([label, value]) => {
      doc.text(`${label}:`, 25, y);
      doc.text(value, 90, y);
      y += 8;
    });

    y += 5;
    doc.setDrawColor(180);
    doc.line(20, y, 190, y);
    y += 10;

    doc.setFont('times', 'italic').setFontSize(11);
    doc.text('May Allah reward you abundantly for your support.', 105, y, { align: 'center' });

    y += 12;
    doc.setFont('helvetica', 'bold').setFontSize(10);
    doc.text('Manchester Murid Community', 105, y, { align: 'center' });
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.text('Registered Charity No: 1194666', 105, y, { align: 'center' });
    y += 5;
    doc.text('info@manchestermuridcommunity.org | +44 7541 475 547', 105, y, { align: 'center' });

    doc.save('MMC_Donation_Receipt.pdf');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6 relative">
      <Confetti recycle={false} numberOfPieces={300} />
      <div className="bg-white shadow-xl p-10 rounded-lg text-center max-w-lg border border-gray-200">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-primary"
        >
          <FontAwesomeIcon icon={faCheckCircle} className="text-6xl" />
        </motion.div>

        <h2 className="text-3xl font-bold text-primary mt-4">
          Thank You for Your <span className="text-gold">Generosity!</span>
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
          <h3 className="text-xl font-semibold text-center mb-4">
            <span className="text-gold">Donation</span>{' '}
            <span className="text-primary">Summary</span>
          </h3>

          <div className="space-y-3 text-left text-lg font-semibold">
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} className="text-gold" />
              <span className="text-primary">Donor:</span>{' '}
              <span className="text-darkText">{donationDetails.donorName}</span>
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-gold" />
              <span className="text-primary">Email:</span>{' '}
              <span className="text-darkText">{donationDetails.donorEmail}</span>
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-gold" />
              <span className="text-primary">Amount:</span>{' '}
              <span className="text-darkText">£{donationDetails.amount.toFixed(2)}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-primary">Reference:</span>{' '}
              <span className="text-darkText">{donationDetails.reference}</span>
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gold" />
              <span className="text-primary">Frequency:</span>{' '}
              <span className="text-darkText">{donationDetails.frequency}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-primary">Payment Method:</span>{' '}
              <span className="text-darkText capitalize">{donationDetails.method}</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-primary">Date:</span>{' '}
              <span className="text-darkText">{donationDetails.date}</span>
            </p>
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
            disabled={!donationDetails.amount}
            className={`px-6 py-3 ${
              donationDetails.amount
                ? 'bg-gray-700 hover:bg-gray-900'
                : 'bg-gray-400 cursor-not-allowed'
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
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-darkPrimary transition flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Return to Homepage
          </button>
          <button
            onClick={() => router.push('/donate')}
            className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition flex items-center justify-center gap-2"
          >
            Donate Again
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </motion.div>
      </div>
    </main>
  );
}