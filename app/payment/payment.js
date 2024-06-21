"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../styles/payment.module.css";
import { useEffect, useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase";

function PaymentPage() {
  const searchParams = useSearchParams();
  const prize = searchParams.get("price");
  const pickup = searchParams.get("pickup");
  const uid = searchParams.get("uid");
  const dropoff = searchParams.get("dropoff");
  const [mode, setMode] = useState("");
  const router = useRouter();

  const docRef = doc(db, "users", uid);

  function selectMode(event) {
    const divs = document.querySelectorAll(`.${styles.mode}`);
    divs.forEach((div) => {
      div.classList.remove(styles.selectedMode);
    });
    event.currentTarget.classList.add(styles.selectedMode);
    const selectedDiv = event.currentTarget;
    setMode(selectedDiv.getAttribute("value"));
  }

  function handleProceed() {
    updateDoc(docRef, {
      rides: arrayUnion({
        destination: dropoff,
        price: prize,
        source: pickup,
        time: new Date(),
      }),
    });
    router.push("/");
  }

  return (
    <div className={styles.contain}>
      <div className={styles.payment}>
        <h1 className={styles.prize}>Payment</h1>
        <div className={styles.modes}>
          <p className={styles.head}>Mode of payment:</p>
          <div className={styles.types}>
            <div className={styles.mode} value="debitCard" onClick={selectMode}>
              Debit Card
            </div>
            <div
              className={styles.mode}
              value="creditCard"
              onClick={selectMode}
            >
              Credit Card
            </div>
            <div className={styles.mode} value="upi" onClick={selectMode}>
              UPI
            </div>
            <div className={styles.mode} value="cash" onClick={selectMode}>
              Cash
            </div>
          </div>
          {mode === "debitCard" && (
            <div className={styles.details}>
              <p className={styles.head}>Name on card</p>
              <input
                type="text"
                placeholder="Enter the name"
                className={styles.input}
              />
              <div className={styles.details2}>
                <div className={styles.detail}>
                  <p className={styles.head}>Card Number</p>
                  <input
                    type="number"
                    placeholder="XXXX XXXX XXXX XXXX"
                    className={`${styles.number} ${styles.input}`}
                  />
                </div>
                <div className={styles.detail}>
                  <p className={styles.head}>Expiry date</p>{" "}
                  <input
                    type="date"
                    className={`${styles.expiry} ${styles.input}`}
                  />
                </div>
                <div className={styles.detail}>
                  <p className={styles.head}>CVV</p>
                  <input
                    type="number"
                    placeholder="XXX"
                    className={`${styles.cvv} ${styles.input}`}
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "creditCard" && (
            <div className={styles.details}>
              <p className={styles.head}>Name on card</p>
              <input
                type="text"
                placeholder="Enter the name"
                className={styles.input}
              />
              <div className={styles.details2}>
                <div className={styles.detail}>
                  <p className={styles.head}>Card Number</p>
                  <input
                    type="number"
                    placeholder="XXXX XXXX XXXX XXXX"
                    className={`${styles.number} ${styles.input}`}
                  />
                </div>
                <div className={styles.detail}>
                  <p className={styles.head}>Expiry date</p>{" "}
                  <input
                    type="date"
                    className={`${styles.expiry} ${styles.input}`}
                  />
                </div>
                <div className={styles.detail}>
                  <p className={styles.head}>CVV</p>
                  <input
                    type="number"
                    placeholder="XXX"
                    className={`${styles.cvv} ${styles.input}`}
                  />
                </div>
              </div>
            </div>
          )}

          {mode === "upi" && (
            <div className={styles.details}>
              <p className={styles.head}>UPI ID</p>
              <input
                type="text"
                placeholder="eg.xxxxx@okxxx.com"
                className={styles.input}
              />
            </div>
          )}

          {mode === "cash" && (
            <div className={styles.details}>
              <p className={styles.head}>Please pay the driver</p>
            </div>
          )}
          <div className={styles.ending}>
            <div className={styles.topay}>
              <div className={styles.amounttext}>Amount: </div>
              <div className={styles.amount}>₹{prize}.00</div>
              <div style={{ fontSize: "1.5rem" }}>{pickup + "-" + dropoff}</div>
            </div>
            <button className={styles.proceed} onClick={handleProceed}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
