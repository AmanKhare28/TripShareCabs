"use client";
import styles from "../styles/page.module.css";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Auth, db } from "./firebase/firebase";
import LeafletMap from "@/components/LeafletMap";
import { geocode, reverseGeocode } from "../utils/geoapify";
import LocationInput from "../components/LocationInput";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState({});
  const [price, setPrice] = useState(0);
  const [uid, setUid] = useState();
  const [inputMode, setInputMode] = useState("pickup");
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpCoords, setPickUpCoords] = useState(null);
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [dropOffCoords, setDropOffCoords] = useState(null);
  const [dist, setDist] = useState(0);

  const pickUpStyle = {
    padding: "20px",
    border: "none",
    backgroundColor: "#fff8ed",
    outline: "none",
    fontSize: "1.2rem",
    borderBottom: "2px dashed #404040",
    borderRadius: "20px 20px 0px 0px",
    width: "100%",
  };

  const dropOffStyle = {
    padding: "20px",
    border: "none",
    backgroundColor: "#fff8ed",
    outline: "none",
    fontSize: "1.2rem",
    borderRadius: "0px 0px 20px 20px",
    width: "100%",
  };

  function haversineDistance(coords1, coords2) {
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  }

  function changeModeToDrop() {
    setInputMode("dropoff");
    console.log(inputMode);
  }
  function changeModeToPick() {
    setInputMode("pickup");
    console.log(inputMode);
  }

  const handlePickUp = async ({ value }) => {
    setPickUpLocation(value);
    const result = await geocode(value);
    if (result) {
      setPickUpCoords([
        result.geometry.coordinates[1],
        result.geometry.coordinates[0],
      ]);
    }
  };

  const handleDropOff = async ({ value }) => {
    setDropOffLocation(value);
    const result = await geocode(value);
    if (result) {
      setDropOffCoords([
        result.geometry.coordinates[1],
        result.geometry.coordinates[0],
      ]);
    }
  };

  async function handleMapClick(latlng) {
    if (
      !latlng ||
      typeof latlng.lat !== "number" ||
      typeof latlng.lng !== "number"
    ) {
      console.error("Invalid latlng object:", latlng);
      return;
    }

    try {
      if (inputMode === "pickup") {
        setPickUpCoords([latlng.lat, latlng.lng]);
        const result = await reverseGeocode(latlng.lat, latlng.lng);
        if (result) {
          setPickUpLocation(result.properties.formatted);
        }
      } else {
        setDropOffCoords([latlng.lat, latlng.lng]);
        const result = await reverseGeocode(latlng.lat, latlng.lng);
        if (result) {
          setDropOffLocation(result.properties.formatted);
        }
      }
    } catch (error) {
      console.error("Error handling map click:", error);
    }
  }

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
      pickup: pickUpLocation,
      dropoff: dropOffLocation,
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
    if (pickUpLocation == "" && dropOffLocation == "") {
      errDiv.style.display = "flex";
      errDiv.innerHTML = "! Please input pickup and dropoff locations.";
    } else if (dropOffLocation == "") {
      errDiv.style.display = "flex";
      errDiv.innerHTML = "! Please input dropoff location.";
    } else if (pickUpLocation == "") {
      errDiv.style.display = "flex";
      errDiv.innerHTML = "! Please input pickup location.";
    } else if (haversineDistance(pickUpCoords, dropOffCoords) > 200) {
      errDiv.style.display = "flex";
      errDiv.innerHTML = "The distance is very large.";
    } else {
      errDiv.style.display = "none";
      document.querySelector(`.${styles.vehicle}`).style.display = "flex";
    }
    setDist(haversineDistance(pickUpCoords, dropOffCoords));
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
            <LocationInput
              value={pickUpLocation}
              onChange={handlePickUp}
              onClick={() => setInputMode("pickup")}
              style={pickUpStyle}
            />
            <LocationInput
              value={dropOffLocation}
              onChange={handleDropOff}
              onClick={() => setInputMode("dropoff")}
              style={dropOffStyle}
            />
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
              onClick={(e) => handleVehicleSelection(e, (15 * dist).toFixed(2))}
            >
              <div className={styles.opthead}>Grande</div>
              <div className={`${styles.optpic} ${styles.grandepic}`}></div>
              <div className={styles.optprice}>₹{(15 * dist).toFixed(2)}</div>
            </div>
            <div
              className={`${styles.grace} ${styles.cat}`}
              onClick={(e) => handleVehicleSelection(e, (12 * dist).toFixed(2))}
            >
              <div className={styles.opthead}>Grace</div>
              <div className={`${styles.optpic} ${styles.gracepic}`}></div>
              <div className={styles.optprice}>₹{(12 * dist).toFixed(2)}</div>
            </div>
            <div
              className={`${styles.swift} ${styles.cat}`}
              onClick={(e) => handleVehicleSelection(e, (10 * dist).toFixed(2))}
            >
              <div className={styles.opthead}>Swift</div>
              <div className={`${styles.optpic} ${styles.swiftpic}`}></div>
              <div className={styles.optprice}>₹{(10 * dist).toFixed(2)}</div>
            </div>
          </div>
          <button className={styles.confirm} onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
      <div className={styles.map}>
        <LeafletMap
          pickUpCoords={pickUpCoords}
          dropOffCoords={dropOffCoords}
          onMapClick={handleMapClick}
        />
      </div>
    </div>
  );
}
