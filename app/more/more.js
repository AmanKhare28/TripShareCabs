// pages/more/morePage.js
"use client";
import { useSearchParams } from "next/navigation";
import styles from "../../styles/more.module.css";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function MorePage() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        // Convert Firestore timestamps to Date objects
        const ridesWithDates = userData.rides.map((ride) => ({
          ...ride,
          time: ride.time.toDate(), // Firestore timestamp to JS Date
        }));
        setRides(ridesWithDates);
      } else {
        console.log("No such document!");
      }
      setLoading(false); // Update loading state
    }

    if (uid) {
      getData();
    }
  }, [uid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.contain}>
        {/* Map through rides array and render each ride */}
        {rides.map((ride, index) => (
          <div key={index} className={styles.ride}>
            <div className={styles.date}>
              {ride.time.getDate() +
                "/" +
                (ride.time.getMonth() + 1) +
                "/" +
                ride.time.getFullYear()}
            </div>
            <div className={styles.down}>
              <div className={styles.location}>
                {ride.source.toUpperCase() +
                  " - " +
                  ride.destination.toUpperCase()}
              </div>
              <div className={styles.price}>{"₹" + ride.price + ".00"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
