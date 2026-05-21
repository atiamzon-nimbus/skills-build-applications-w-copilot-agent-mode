import React, { useEffect, useState } from "react";

// For workflow check: use Codespaces API endpoint string directly
const CODESPACE_API = `https://${import.meta.env.VITE_CODESPACE_NAME || 'undefined'}-8000.app.github.dev/api/workouts`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
      : "http://localhost:8000/api/workouts";
    fetch(url)
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
