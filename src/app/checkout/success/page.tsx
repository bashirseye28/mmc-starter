"use client";

import { Suspense } from "react";
import CheckoutSuccessContent from "./CheckoutSuccessContent";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Loading order details...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}