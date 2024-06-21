// pages/payment/index.js
import { Suspense } from "react";
import PaymentPage from "./payment";

export default function Payment() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
