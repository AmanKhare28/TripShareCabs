"use client";
import styles from "../styles/page.module.css";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Auth, db } from "./firebase/firebase";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState({});
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [price, setPrice] = useState(0);
  const [uid, setUid] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, async (user) => {
      if (!user) {
        router.push("/auth");
      } else {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setUid(user.uid);
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  function handleProfile() {
    if (userData && user) {
      // Create a URLSearchParams object to handle query parameters
      const params = new URLSearchParams({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: user.email,
        uid: uid,
        subscription: userData.subscription,
      });

      // Navigate to the profile page with query parameters
      router.push(`/profile?${params.toString()}`);
    }
  }

  function handleConfirm() {
    const params = new URLSearchParams({
      pickup: pickup,
      dropoff: dropoff,
      price: price,
      uid: uid,
    });
    router.push(`/payment?${params.toString()}`);
  }

  function handlePremium() {
    const params = new URLSearchParams({
      uid: uid,
    });
    router.push(`/premium?${params.toString()}`);
  }

  function showVehicle() {
    const errDiv = document.querySelector(`.${styles.error}`);
    if (pickup == "" && dropoff == "") {
      errDiv.style.display = "flex";
      errDiv.innerHTML = "! Please input pickup and dropoff locations.";
    } else if (dropoff == "") {
      errDiv.style.display = "flex";
      errDiv.innerHTML = "! Please input dropoff location.";
    } else if (pickup == "") {
      errDiv.style.display = "flex";
      errDiv.innerHTML = "! Please input pickup location.";
    } else {
      document.querySelector(`.${styles.vehicle}`).style.display = "flex";
    }
  }

  function showConfirm() {
    document.querySelector(`.${styles.confirm}`).style.display = "block";
  }

  function handleVehicleSelection(e, vehiclePrice) {
    const divs = document.querySelectorAll(`.${styles.cat}`);
    divs.forEach((div) => {
      div.classList.remove(styles.selected);
    });
    e.currentTarget.classList.add(styles.selected);
    setPrice(vehiclePrice);
    showConfirm();
  }

  return (
    <div className={styles.main}>
      <div className={styles.ride}>
        <div className={styles.nav}>
          <div className={styles.logo}></div>
          <div className={styles.right}>
            <div className={styles.premium} onClick={handlePremium}>
              Premium
            </div>
            <div className={styles.profile} onClick={handleProfile}></div>
          </div>
        </div>
        <div className={styles.error}></div>
        <div className={styles.details}>
          <h3 className={styles.triphead}>Where to go ?</h3>
          <div className={styles.trip}>
            <input
              type="text"
              placeholder="Pickup"
              className={`${styles.pick} ${styles.input}`}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Drop off"
              className={`${styles.drop} ${styles.input}`}
              onChange={(e) => {
                setDropoff(e.target.value);
              }}
            ></input>
          </div>
          <div className={styles.share}>
            <input type="checkbox" className={styles.check} />
            <p>Share the ride</p>
          </div>
          <button className={styles.search} onClick={showVehicle}>
            Choose vehicle
          </button>
        </div>
        <div className={styles.vehicle}>
          <h3 className={styles.triphead}>Choose a vehicle</h3>
          <div className={styles.options}>
            <div
              className={`${styles.grande} ${styles.cat}`}
              onClick={(e) => handleVehicleSelection(e, 120)}
            >
              <div className={styles.opthead}>Grande</div>
              <div className={`${styles.optpic} ${styles.grandepic}`}></div>
              <div className={styles.optprice}>₹120.00</div>
            </div>
            <div
              className={`${styles.grace} ${styles.cat}`}
              value="90"
              onClick={(e) => handleVehicleSelection(e, 90)}
            >
              <div className={styles.opthead}>Grace</div>
              <div className={`${styles.optpic} ${styles.gracepic}`}></div>
              <div className={styles.optprice}>₹90.00</div>
            </div>
            <div
              className={`${styles.swift} ${styles.cat}`}
              value="60"
              onClick={(e) => handleVehicleSelection(e, 60)}
            >
              <div className={styles.opthead}>Swift</div>
              <div className={`${styles.optpic} ${styles.swiftpic}`}></div>
              <div className={styles.optprice}>₹60.00</div>
            </div>
          </div>
          <button className={styles.confirm} onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
      <div className={styles.map}></div>
    </div>
  );
}
