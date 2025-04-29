'use client';

import { Suspense } from 'react';
import DonationSuccessPageContent from './DonationSuccessPageContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary text-sm">
      Loading donation success...
    </div>}>
      <DonationSuccessPageContent />
    </Suspense>
  );
}