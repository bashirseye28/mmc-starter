import { Suspense } from "react";
import DaahiraSuccessPageContent from "./DaahiraSuccessPageContent";

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center py-20">Loading receipt...</p>}>
      <DaahiraSuccessPageContent />
    </Suspense>
  );
}