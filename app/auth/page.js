"use client";
import styles from "../../styles/auth.module.css";
import Register from "./register";
import Signin from "./signin";
import { useState } from "react";

function Authenticate() {
  const [mode, setMode] = useState("register");

  function toggleMode() {
    mode == "register" ? setMode("signin") : setMode("register");
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}></div>
          <div className={styles.image}></div>
        </div>
        <div className={styles.right}>
          {mode == "register" ? <Register /> : <Signin />}
          <p className={styles.para}>
            {mode == "register" ? "Aready have an account?" : "New User?."}{" "}
            <span className={styles.span} onClick={toggleMode}>
              {mode == "register" ? "Sign In" : "Create Account"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Authenticate;
