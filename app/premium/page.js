"use client"; // Mark this file as a client component

import { useRouter } from "next/navigation"; // Correct import for useRouter in Next.js 13

export default function Premium() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "80vh",
        width: "50vw",
        border: "5px solid #5d7086",
        marginLeft: "25%",
        marginTop: "5%",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          textAlign: "center",
          color: "#5d7086",
        }}
      >
        Premium
      </h1>
      <h1
        style={{
          fontSize: "100px",
          textAlign: "center",
          color: "#5d7086",
          marginTop: "-30px",
        }}
      >
        ₹99.00
      </h1>
      <h1
        style={{
          fontSize: "30px",
          color: "#5d7086",
          marginTop: "30px",
          marginLeft: "20px",
        }}
      >
        Features:
      </h1>
      <ul
        style={{
          listStyleType: "circle",
          fontSize: "30px",
          marginLeft: "60px",
          color: "#5d7086",
        }}
      >
        <li style={{ marginTop: "25px" }}>Priority Booking</li>
        <li style={{ marginTop: "25px" }}>Exclusive Discounts</li>
        <li style={{ marginTop: "25px" }}>Flexible Cancellation</li>
        <li style={{ marginTop: "25px" }}>Dedicated Support</li>
      </ul>
      <button
        style={{
          width: "50%",
          marginLeft: "25%",
          padding: "20px",
          fontSize: "20px",
          border: "none",
          backgroundColor: "#5d7086",
          color: "white",
          fontWeight: "600",
          marginTop: "40px",
          cursor: "pointer",
        }}
        onClick={() => {
          console.log("Button clicked");
          router.push(`/paymentModes?prize=${99}`);
        }}
      >
        Buy Now
      </button>
    </div>
  );
}
