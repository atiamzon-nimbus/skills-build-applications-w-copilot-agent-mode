import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../App";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/activities`)
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
