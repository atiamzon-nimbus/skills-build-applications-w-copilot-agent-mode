import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../App";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/teams`)
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
