// /src/app/success/page.tsx
"use client";

import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function SuccessPage() {
  return (
    <Suspense fallback={<p>Loading donation details...</p>}>
      <SuccessContent />
    </Suspense>
  );
}