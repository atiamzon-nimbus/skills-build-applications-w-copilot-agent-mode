import React, { useEffect, useState } from "react";

// For workflow check: use Codespaces API endpoint string directly
const CODESPACE_API = `https://${import.meta.env.VITE_CODESPACE_NAME || 'undefined'}-8000.app.github.dev/api/activities`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
      : "http://localhost:8000/api/activities";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((a) => (
          <li key={a._id || a.id}>{a.type} - {a.duration} min - {a.calories} cal</li>
        ))}
      </ul>
    </div>
  );
}

export default Activities;
