'use client';

import { Suspense } from 'react';
import SuccessPageContent from './SuccessPageContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading your order...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}