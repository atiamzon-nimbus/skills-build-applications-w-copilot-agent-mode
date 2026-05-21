import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../App";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/workouts`)
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading workouts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((w) => (
          <li key={w._id || w.id}>{w.name} - {w.difficulty} ({w.duration} min)</li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
