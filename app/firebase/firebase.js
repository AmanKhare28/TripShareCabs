// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYkAmg34fMWmW4XBxOD0TZEj1rKDIaM48",
  authDomain: "tripshare-87d6d.firebaseapp.com",
  projectId: "tripshare-87d6d",
  storageBucket: "tripshare-87d6d.appspot.com",
  messagingSenderId: "524367048141",
  appId: "1:524367048141:web:229fa997eb43df84e6e884",
  measurementId: "G-WPX10J2WEW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics, isSupported }) => {
    isSupported().then((supported) => {
      if (supported) {
        const analytics = getAnalytics(app);
      }
    });
  });
}

export const auth = getAuth(app);
