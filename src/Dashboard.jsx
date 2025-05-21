import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

function Dashboard() {
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "checkIns"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCheckIns(data);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h2>Wellness Check-In History</h2>
      {checkIns.length === 0 ? (
        <p>No check-ins yet.</p>
      ) : (
        <ul>
          {checkIns.map((entry) => (
            <li key={entry.id}>
              <strong>Mood:</strong> {entry.mood} | <strong>Worked:</strong>{" "}
              {entry.hoursWorked} hrs | <strong>Slept:</strong> {entry.gotSleep}{" "}
              | <strong>Water:</strong> {entry.waterIntake} oz |{" "}
              <strong>Note:</strong> {entry.notes}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
