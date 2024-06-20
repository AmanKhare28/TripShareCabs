"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Auth, db } from "../firebase/firebase";
import styles from "../../styles/register.module.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ps, setPs] = useState("hide");

  const router = useRouter();

  function togglePs() {
    ps === "hide" ? setPs("show") : setPs("hide");
  }

  async function handleRegister() {
    try {
      const credentials = await createUserWithEmailAndPassword(
        Auth,
        email,
        password
      );
      const user = credentials.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        subscription: "Basic",
      });

      router.push("/");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }

  return (
    <div className={styles.form}>
      <h1 className={styles.phead}>START FOR FREE</h1>
      <p className={styles.mhead}>
        Create
        <br />
        Your Account
      </p>
      <div className={styles.name}>
        <div className={styles.first}>
          <p className={styles.para}>First Name</p>
          <input
            className={styles.half}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />
        </div>
        <div className={styles.last}>
          <p className={styles.para}>Last Name</p>
          <input
            className={styles.half}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />
        </div>
      </div>
      <div className={styles.emailcont}>
        <p className={styles.para}>Email</p>
        <input
          className={styles.full}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </div>
      <div className={styles.passcont}>
        <p className={styles.para}>Password</p>
        <div className={styles.pass}>
          <input
            type={ps === "hide" ? "password" : "text"}
            className={styles.password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button type="button" onClick={togglePs} className={styles.show}>
            {ps === "hide" ? "Show" : "Hide"}
          </button>
        </div>
      </div>
      <button className={styles.but} onClick={handleRegister}>
        Create Account
      </button>
    </div>
  );
}

export default Register;
