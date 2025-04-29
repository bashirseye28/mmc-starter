'use client';

import { Suspense } from 'react';
import DonationSuccessPageContent from './DonationSuccessPageContent';

export default function SuccessPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary text-sm">
      Loading donation success page...
    </div>}>
      <DonationSuccessPageContent sessionId={searchParams.session_id} />
    </Suspense>
  );
}