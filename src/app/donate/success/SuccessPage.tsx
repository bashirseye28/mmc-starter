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
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import Confetti from 'react-confetti';

export default function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [donationDetails, setDonationDetails] = useState({
    amount: 0,
    frequency: 'One-time',
    method: 'Unknown',
    donorName: 'Anonymous',
    donorEmail: 'Not Provided',
    reference: 'General Donation',
    date: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
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
          setDonationDetails({
            amount: parseFloat(data.donation_amount || '0'),
            frequency: data.donation_frequency || 'One-time',
            method: data.payment_method_types || 'Card',
            donorName: data.donor_name || 'Anonymous',
            donorEmail: data.donor_email || 'Not Provided',
            reference: data.donation_reference || 'General Donation',
            date: new Date().toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }),
          });
        } else {
          console.error('Failed to fetch donation details:', data.error);
        }
      } catch (error) {
        console.error('Error fetching donation details:', error);
      }
    };

    fetchDonationDetails();
  }, [sessionId]);

  const generatePDF = async () => {
    const doc = new jsPDF();
    const logoUrl = 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1742051469/logo_ys5gk6.png';

    const image = await fetch(logoUrl).then((res) => res.blob());
    const imageData = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(image);
    });

    doc.addImage(imageData, 'PNG', 80, 10, 50, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Donation Receipt', 105, 45, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    let y = 60;
    const line = (label: string, value: string) => {
      doc.text(`${label}:`, 20, y);
      doc.text(value, 80, y);
      y += 10;
    };

    line('Donor Name', donationDetails.donorName);
    line('Donor Email', donationDetails.donorEmail);
    line('Reference', donationDetails.reference);
    line('Amount', `£${donationDetails.amount.toFixed(2)}`);
    line('Frequency', donationDetails.frequency);
    line('Payment Method', donationDetails.method);
    line('Date', donationDetails.date);

    y += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for your generous donation.', 20, y);
    y += 7;
    doc.text('May Allah reward you abundantly for your support.', 20, y);

    y += 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Manchester Murid Community', 20, y);
    y += 7;
    doc.setFont('helvetica', 'normal');
    doc.text('Registered Charity No: 1194666', 20, y);
    y += 7;
    doc.text('info@manchestermuridcommunity.org', 20, y);
    y += 7;
    doc.text('+44 7541 475 547', 20, y);

    doc.save('Donation_Receipt.pdf');
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
          <h3 className="text-xl font-semibold text-primary text-center">
            <span className="text-gold">Donation</span> Summary
          </h3>

          <div className="mt-3 space-y-3 text-left">
            <p><strong>Donor:</strong> {donationDetails.donorName}</p>
            <p><strong>Email:</strong> {donationDetails.donorEmail}</p>
            <p><strong>Reference:</strong> {donationDetails.reference}</p>
            <p><strong>Amount:</strong> £{donationDetails.amount.toFixed(2)}</p>
            <p><strong>Frequency:</strong> {donationDetails.frequency}</p>
            <p><strong>Method:</strong> {donationDetails.method}</p>
            <p><strong>Date:</strong> {donationDetails.date}</p>
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
            className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-900 transition flex items-center justify-center gap-2"
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
            className="px-6 py-3 bg-gold text-black font-semibold rounded-lg shadow-md hover:bg-[#d4af37] transition flex items-center justify-center gap-2"
          >
            Donate Again
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </motion.div>
      </div>
    </main>
  );
}