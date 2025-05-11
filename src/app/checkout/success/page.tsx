import dynamic from "next/dynamic";
import { Suspense } from "react";

// ✅ Dynamically import to prevent hydration mismatch issues
const CheckoutSuccessContent = dynamic(() => import("./CheckoutSuccessContent"), {
  ssr: false,
});

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading order confirmation...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}