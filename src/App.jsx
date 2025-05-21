// App.jsx
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import CheckInForm from "./CheckInForm";
import styles from "./App.module.css";

function App() {
  const [user, setUser] = useState(null);

  // Watch for login/logout
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup listener
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className={styles.bodyContainer}>
      {user ? (
        <>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Logout</button>
          <CheckInForm />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
