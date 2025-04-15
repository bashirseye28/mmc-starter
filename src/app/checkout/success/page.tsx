import { Suspense } from 'react';
import SuccessPage from './SuccessPage';

export default function CheckoutSuccessWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>}>
      <SuccessPage />
    </Suspense>
  );
}