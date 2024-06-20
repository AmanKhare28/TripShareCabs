"use client";

import styles from "../../styles/premium.module.css";
import { useSearchParams } from "next/navigation";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Premium() {
  const params = useSearchParams();
  const uid = params.get("uid");

  function handleBuy() {
    const docRef = doc(db, "users", uid);
    updateDoc(docRef, {
      subscription: "Premium",
    });
  }

  return (
    <div className={styles.c}>
      <div className={styles.card}>
        <h1 className={styles.phead}>Premium</h1>
        <h1 className={styles.cost}>₹99.00</h1>
        <h1 className={styles.fhead}>Features:</h1>
        <ul className={styles.list}>
          <li className={styles.item}>Priority Booking</li>
          <li className={styles.item}>Exclusive Discounts</li>
          <li className={styles.item}>Flexible Cancellation</li>
          <li className={styles.item}>Dedicated Support</li>
        </ul>
        <button className={styles.buy} onClick={handleBuy}>
          Buy Now
        </button>
      </div>
    </div>
  );
}
