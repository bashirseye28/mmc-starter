'use client';

import { Suspense } from 'react';
import SuccessPageContent from './SuccessPageContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary text-sm">Loading your order...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}