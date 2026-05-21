import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../App";

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/leaderboard`)
      .then((res) => res.json())
      .then((data) => {
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {entries.map((e) => (
          <li key={e._id || e.id}>{e.user?.username || e.user} - {e.score} pts (Rank {e.rank})</li>
        ))}
      </ol>
    </div>
  );
}

export default Leaderboard;
