"use client";
import { useRouter } from "next/navigation";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import styles from "../styles/home.module.css";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [prize, setPrize] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth");
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, [router]);

  function showCats() {
    document.querySelector(`.${styles.options}`).style.display = "flex";
  }

  function showConfirm() {
    document.querySelector(`.${styles.confirm}`).style.display = "block";
  }

  function selectDiv(event) {
    const divs = document.querySelectorAll(`.${styles.cat}`);
    divs.forEach((div) => {
      div.classList.remove(styles.selected);
    });
    event.currentTarget.classList.add(styles.selected);
    setPrize(event.currentTarget.getAttribute("value"));
    showConfirm();
  }

  function handlePremium() {
    router.push("/premium");
  }

  useEffect(() => {
    const divs = document.querySelectorAll(`.${styles.cat}`);
    divs.forEach((div) => {
      div.addEventListener("click", selectDiv);
    });
    return () => {
      divs.forEach((div) => {
        div.removeEventListener("click", selectDiv);
      });
    };
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.ride}>
        <div className={styles.nav}>
          <div className={styles.logo}></div>
          <div className={styles.right}>
            <div className={styles.premium} onClick={handlePremium}>
              Premium
            </div>
            <div className={styles.profile}></div>
          </div>
        </div>
        <h3 className={styles.triphead}>Where to go ?</h3>
        <div className={styles.trip}>
          <input
            type="text"
            placeholder="Pickup"
            className={`${styles.pick} ${styles.input}`}
          ></input>
          <input
            type="text"
            placeholder="Drop off"
            className={`${styles.drop} ${styles.input}`}
          ></input>
        </div>
        <div className={styles.share}>
          <input type="checkbox" className={styles.check} />
          <p>Share the ride</p>
        </div>
        <button className={styles.search} onClick={showCats}>
          Search
        </button>
        <div className={styles.options}>
          <div className={`${styles.grande} ${styles.cat}`} value="120">
            <div className={styles.opthead}>Grande</div>
            <div className={`${styles.optpic} ${styles.grandepic}`}></div>
            <div className={styles.optprice}>₹120.00</div>
          </div>
          <div className={`${styles.grace} ${styles.cat}`} value="90">
            <div className={styles.opthead}>Grace</div>
            <div className={`${styles.optpic} ${styles.gracepic}`}></div>
            <div className={styles.optprice}>₹90.00</div>
          </div>
          <div className={`${styles.swift} ${styles.cat}`} value="60">
            <div className={styles.opthead}>Swift</div>
            <div className={`${styles.optpic} ${styles.swiftpic}`}></div>
            <div className={styles.optprice}>₹60.00</div>
          </div>
        </div>
        <button
          className={styles.confirm}
          onClick={() => router.push(`/paymentModes?prize=${prize}`)}
        >
          Confirm
        </button>
      </div>
      <div
        style={{
          height: "100%",
          width: "60%",
          backgroundImage: "url('/map.png')",
        }}
      ></div>
    </div>
  );
}
