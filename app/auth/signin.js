"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "../../styles/register.module.css";
import { useState } from "react";
import { Auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ps, setPs] = useState("hide");
  const router = useRouter();

  function togglePs() {
    ps == "hide" ? setPs("show") : setPs("hide");
  }

  async function handleSignIn() {
    try {
      const credentials = await signInWithEmailAndPassword(
        Auth,
        email,
        password
      );
      const user = credentials.user;
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.form} style={{ height: "71.5%" }}>
      <h1 className={styles.phead}>START FOR FREE</h1>
      <p className={styles.mhead}>
        Hello,
        <br />
        Welcome Back
      </p>
      <div className={styles.emailcont}>
        <p className={styles.para}>Email</p>
        <input
          className={styles.full}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className={styles.passcont}>
        <p className={styles.para}>Password</p>
        <div className={styles.pass}>
          <input
            type={ps == "hide" ? "password" : "text"}
            className={styles.password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={togglePs} className={styles.show}>
            {ps == "hide" ? "Show" : "Hide"}
          </button>
        </div>
      </div>
      <button className={styles.but} onClick={handleSignIn}>
        Sign In
      </button>
    </div>
  );
}

export default Signin;
