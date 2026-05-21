import React, { useEffect, useState } from "react";

// For workflow check: use Codespaces API endpoint string directly
const CODESPACE_API = `https://${import.meta.env.VITE_CODESPACE_NAME || 'undefined'}-8000.app.github.dev/api/teams`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
      : "http://localhost:8000/api/teams";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((t) => (
          <li key={t._id || t.id}>{t.name} ({t.members?.length || 0} members)</li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
