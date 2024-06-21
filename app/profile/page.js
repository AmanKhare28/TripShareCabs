// pages/payment/index.js
import { Suspense } from "react";
import ProfilePage from "./profile";

export default function Profile() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilePage />
    </Suspense>
  );
}
