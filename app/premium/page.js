// pages/payment/index.js
import { Suspense } from "react";
import PremiumPage from "./premium";

export default function Premium() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PremiumPage />
    </Suspense>
  );
}
