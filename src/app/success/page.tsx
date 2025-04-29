'use client';

import { Suspense } from 'react';
import DonationSuccessPageContent from './DonationSuccessPageContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading donation success page...</div>}>
      <DonationSuccessPageContent />
    </Suspense>
  );
}