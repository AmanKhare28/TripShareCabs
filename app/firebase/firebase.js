import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDYkAmg34fMWmW4XBxOD0TZEj1rKDIaM48",
  authDomain: "tripshare-87d6d.firebaseapp.com",
  projectId: "tripshare-87d6d",
  storageBucket: "tripshare-87d6d.appspot.com",
  messagingSenderId: "524367048141",
  appId: "1:524367048141:web:4803c5ba4f004bebe6e884",
  measurementId: "G-KE5TCZBHEB",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const Auth = getAuth(app);
export const db = getFirestore(app);
