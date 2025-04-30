'use client';

import { Suspense } from 'react';
import CheckoutSuccessContent from './CheckoutSuccessContent';

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading your order...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}