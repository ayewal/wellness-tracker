// Login.jsx
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import styles from "./App.module.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setError(""); // clear errors when toggling
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.title}>
          {isSignUp ? "Create an Account" : "Log In"}
        </h2>

        {error && <p className={styles.error}>{error}</p>}

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />

        <button type="submit" className={styles.submitButton}>
          {isSignUp ? "Sign Up" : "Log In"}
        </button>

        <p className={styles.toggleText}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={toggleMode} className={styles.toggleLink}>
            {isSignUp ? "Log In" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
