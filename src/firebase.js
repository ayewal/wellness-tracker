import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace these with YOUR actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyAPEwao9IYKjVxo8eg1WhlLpCrA2QcScbc",
  authDomain: "wellnesstracker-1ba25.firebaseapp.com",
  projectId: "wellnesstracker-1ba25",
  storageBucket: "wellnesstracker-1ba25.firebasestorage.app",
  messagingSenderId: "971913292605",
  appId: "1:971913292605:web:c59c0d00ac359af345f354",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
