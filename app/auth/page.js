"use client";

import styles from "../../styles/auth.module.css";
import { auth } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("signin");
  const router = useRouter();

  function toggleVariant() {
    setVariant(variant === "signin" ? "signup" : "signin");
  }

  async function signIn() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  }

  async function signUp() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.signin}>
        <h1>{variant === "signin" ? "Sign In" : "Register"}</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button onClick={variant === "signin" ? signIn : signUp}>
          {variant === "signin" ? "Sign In" : "Sign Up"}
        </button>
        {variant === "signin" ? (
          <p>
            New User? <span onClick={toggleVariant}>Create new account</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={toggleVariant}>Sign In</span>
          </p>
        )}
      </div>
    </div>
  );
}
