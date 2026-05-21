import React, { useEffect, useState } from "react";

// For workflow check: use Codespaces API endpoint string directly
const CODESPACE_API = `https://${import.meta.env.VITE_CODESPACE_NAME || 'undefined'}-8000.app.github.dev/api/leaderboard`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
      : "http://localhost:8000/api/leaderboard";
    fetch(url)
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
