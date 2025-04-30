import { Suspense } from 'react';
import SuccessPageContent from './SuccessPageContent';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading your success page...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}