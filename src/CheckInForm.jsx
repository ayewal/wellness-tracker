import React, { useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import styles from "./App.module.css";

console.log("Styles object:", styles);

function CheckInForm() {
  const [formData, setFormData] = useState({
    mood: "",
    hoursWorked: "1",
    gotSleep: "",
    waterIntake: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.mood.trim()) newErrors.mood = "Mood is required";
    if (!formData.gotSleep) newErrors.gotSleep = "Please select Yes or No";
    if (!formData.waterIntake.trim())
      newErrors.waterIntake = "Water intake is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in");
      return;
    }

    try {
      const userCheckInsRef = collection(db, "users", user.uid, "checkins");
      await addDoc(userCheckInsRef, {
        ...formData,
        createdAt: Timestamp.now(),
      });

      alert("Check-in saved!");
      setFormData({
        mood: "",
        hoursWorked: "1",
        gotSleep: "",
        waterIntake: "",
        notes: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error saving check-in:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className={styles.bodyContainer}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2 className={styles.title}>We LUV you... tell us about your day</h2>

        <label>Mood:</label>
        <select
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          className={errors.mood ? styles.errorInput : styles.selectField}
        >
          <option value="">Select mood</option>
          <option value="happy">😊 Happy</option>
          <option value="okay">😐 Okay</option>
          <option value="tired">🥱 Tired</option>
        </select>
        {errors.mood && <span className={styles.errorText}>{errors.mood}</span>}

        <label>Hours Worked:</label>
        <select
          value={formData.hoursWorked}
          onChange={(e) =>
            setFormData({ ...formData, hoursWorked: e.target.value })
          }
          className={styles.selectField}
          required
        >
          <option value="">Select hours</option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="10+">10+</option>
        </select>

        <fieldset className={styles.fieldsetReset}>
          <legend>Did you get 6–8 hours of sleep?</legend>
          <label>
            <input
              type="radio"
              name="gotSleep"
              value="yes"
              checked={formData.gotSleep === "yes"}
              onChange={handleChange}
              className={styles.radioInput}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="gotSleep"
              value="no"
              checked={formData.gotSleep === "no"}
              onChange={handleChange}
              className={styles.radioInput}
            />
            No
          </label>
        </fieldset>
        {errors.gotSleep && (
          <span className={styles.errorText}>{errors.gotSleep}</span>
        )}

        <label>Water Intake (oz):</label>
        <input
          type="number"
          name="waterIntake"
          value={formData.waterIntake}
          onChange={handleChange}
          className={errors.waterIntake ? styles.errorInput : styles.inputField}
          required
        />
        {errors.waterIntake && (
          <span className={styles.errorText}>{errors.waterIntake}</span>
        )}

        <label>Additional Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className={styles.textareaField}
        />

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CheckInForm;
