// pages/more/index.js
import { Suspense } from "react";
import MorePage from "./more";

export default function More() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MorePage />
    </Suspense>
  );
}
