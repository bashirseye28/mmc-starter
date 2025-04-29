'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const sessionId = searchParams.session_id;
  const router = useRouter();

  const [donationDetails, setDonationDetails] = useState({
    amount: 0,
    frequency: 'One-time',
    method: 'Unknown',
    donorName: 'Anonymous',
    donorEmail: 'Not Provided',
    date: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    const fetchDonationDetails = async () => {
      if (!sessionId) return;

      try {
        const response = await fetch(`/api/stripe/session?session_id=${sessionId}`);
        const data = await response.json();

        if (response.ok) {
          setDonationDetails({
            amount: data.amount_total ? parseFloat(data.amount_total) : 0,
            frequency: data.frequency || 'One-time',
            method: data.payment_method_types || 'Card',
            donorName: data.donor_name || 'Anonymous',
            donorEmail: data.donor_email || 'Not Provided',
            date: new Date().toLocaleDateString(),
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

  const generatePDF = () => {
    const doc = new jsPDF();
    const logoUrl =
      'https://res.cloudinary.com/dnmoy5wua/image/upload/v1742051469/logo_ys5gk6.png';

    doc.addImage(logoUrl, 'PNG', 80, 10, 50, 20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Donation Receipt', 20, 45);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Donor Name: ${donationDetails.donorName}`, 20, 60);
    doc.text(`Donor Email: ${donationDetails.donorEmail}`, 20, 70);
    doc.text(`Donation Amount: £${donationDetails.amount}`, 20, 80);
    doc.text(`Donation Frequency: ${donationDetails.frequency}`, 20, 90);
    doc.text(`Payment Method: ${donationDetails.method}`, 20, 100);
    doc.text(`Date: ${donationDetails.date}`, 20, 110);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for your generous donation!', 20, 130);
    doc.text('Manchester Murid Community', 20, 140);
    doc.setFont('helvetica', 'normal');
    doc.text('info@manchestermuridcommunity.org', 20, 160);
    doc.text('+44 7541 475 547', 20, 170);
    doc.setFont('helvetica', 'bold');
    doc.text('Registered Charity No: 1194666', 20, 150);

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

          <div className="mt-3 space-y-3">
            <p className="text-lg font-semibold text-primary flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} className="text-gold" />
              Donor: <span className="text-darkText">{donationDetails.donorName}</span>
            </p>
            <p className="text-lg font-semibold text-primary flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-gold" />
              Email: <span className="text-darkText">{donationDetails.donorEmail}</span>
            </p>
            <p className="text-lg font-semibold text-primary flex items-center gap-2">
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-gold" />
              Amount: <span className="text-primary font-bold">£{donationDetails.amount}</span>
            </p>
            <p className="text-lg font-semibold text-primary flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-gold" />
              Frequency: <span className="text-darkText">{donationDetails.frequency}</span>
            </p>
            <p className="text-lg font-semibold text-primary flex items-center gap-2">
              Payment Method: <span className="text-darkText capitalize">{donationDetails.method}</span>
            </p>
            <p className="text-lg font-semibold text-primary flex items-center gap-2">
              Date: <span className="text-darkText">{donationDetails.date}</span>
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