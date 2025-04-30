import { Suspense } from 'react';
import DonationSuccessContent from './DonationSuccessContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DonationSuccessContent />
    </Suspense>
  );
}