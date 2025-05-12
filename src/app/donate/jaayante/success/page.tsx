// /src/app/success/jaayante/page.tsx
import { Suspense } from "react";
import KstSuccessPageContent from "./KstSuccessPageContent"; // move logic there

export default function KstSuccessPage() {
  return (
    <Suspense fallback={<p className="text-center py-20">Loading KST receipt...</p>}>
      <KstSuccessPageContent />
    </Suspense>
  );
}