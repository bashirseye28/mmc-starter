import { Suspense } from "react";
import SuccessPage from "./SuccessPage";

export default function Success() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-center text-gray-600 text-lg">
          Loading your receipt...
        </div>
      }
    >
      <SuccessPage />
    </Suspense>
  );
}