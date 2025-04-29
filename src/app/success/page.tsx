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
  params,
  searchParams,
}: {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const router = useRouter();
  const sessionId = typeof searchParams.session_id === 'string' ? searchParams.session_id : undefined;

  const [donationDetails, setDonationDetails] = useState({
    amount: 0,
    frequency: 'One-time',
    method: 'Unknown',
    donorName: 'Anonymous',
    donorEmail: 'Not Provided',
    date: new Date().toLocaleDateString(),
  });

  useEffect(() => {
    if (!sessionId) return;

    const fetchDonationDetails = async () => {
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
    const logoUrl = 'https://res.cloudinary.com/dnmoy5wua/image/upload/v1742051469/logo_ys5gk6.png';

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
        {/* Your donation success page content */}
      </div>
    </main>
  );
}