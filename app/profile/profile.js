"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db, Auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "../../styles/profile.module.css";
import { signOut } from "firebase/auth";

function ProfilePage() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const email = searchParams.get("email");
  const uid = searchParams.get("uid");
  const subscription = searchParams.get("subscription");
  const router = useRouter();

  const [rides, setRides] = useState([]);

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
    }
    if (uid) {
      getData();
    }
  }, [uid]);

  function handleSeeAll() {
    const params = new URLSearchParams({
      uid: uid,
    });
    router.push(`/more?${params.toString()}`);
  }

  function logout() {
    signOut(Auth)
      .then(() => {
        console.log("User signed out successfully.");
        router.push("/auth");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  const n = rides.length;

  return (
    <div className={styles.main}>
      <div className={styles.detail}>
        <div className={styles.dp}></div>
        <div className={styles.info}>
          <div className={styles.name}>{firstName + " " + lastName}</div>
          <div className={styles.email}>{email}</div>
        </div>
        <button className={styles.logout} onClick={logout}>
          Log Out
        </button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <div className={styles.top}>
            <div className={styles.head}>Past Rides</div>
            <span className={styles.more} onClick={handleSeeAll}>
              See All
            </span>
          </div>
          <div className={styles.rides}>
            {n === 0 ? (
              <div className={styles.no}>No Rides Available</div>
            ) : n === 1 ? (
              <div className={styles.ride}>
                <div className={styles.date}>
                  {rides[n - 1].time.getDate() +
                    "/" +
                    (rides[n - 1].time.getMonth() + 1) +
                    "/" +
                    rides[n - 1].time.getFullYear()}
                </div>
                <div className={styles.down}>
                  <div className={styles.location}>
                    {rides[n - 1].source.toUpperCase() +
                      " - " +
                      rides[n - 1].destination.toUpperCase()}
                  </div>
                  <div className={styles.price}>
                    {"₹" + rides[n - 1].price + ".00"}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.ride}>
                  <div className={styles.date}>
                    {rides[n - 1].time.getDate() +
                      "/" +
                      (rides[n - 1].time.getMonth() + 1) +
                      "/" +
                      rides[n - 1].time.getFullYear()}
                  </div>
                  <div className={styles.down}>
                    <div className={styles.location}>
                      {rides[n - 1].source.toUpperCase() +
                        " - " +
                        rides[n - 1].destination.toUpperCase()}
                    </div>
                    <div className={styles.price}>
                      {"₹" + rides[n - 1].price + ".00"}
                    </div>
                  </div>
                </div>
                <div className={styles.ride}>
                  <div className={styles.date}>
                    {rides[n - 2].time.getDate() +
                      "/" +
                      (rides[n - 2].time.getMonth() + 1) +
                      "/" +
                      rides[n - 2].time.getFullYear()}
                  </div>
                  <div className={styles.down}>
                    <div className={styles.location}>
                      {rides[n - 2].source.toUpperCase() +
                        " - " +
                        rides[n - 2].destination.toUpperCase()}
                    </div>
                    <div className={styles.price}>
                      {"₹" + rides[n - 2].price + ".00"}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.subscription}>
            <div className={styles.head}>Subscription</div>
            <div className={styles.plan}>{subscription}</div>
            <button className={styles.buy}>Buy Now</button>
          </div>
          <div className={styles.socials}>
            <div className={styles.head}>Our Socials</div>
            <a
              href="https://www.linkedin.com/in/aman-khare-591749249/"
              target="_blank"
            >
              <div className={styles.linkedin}></div>
            </a>
            <a href="https://x.com/AmanKha50282795" target="_blank">
              <div className={styles.twitter}></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
