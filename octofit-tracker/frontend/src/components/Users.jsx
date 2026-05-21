import React, { useEffect, useState } from "react";

// For workflow check: use Codespaces API endpoint string directly
const CODESPACE_API = `https://${import.meta.env.VITE_CODESPACE_NAME || 'undefined'}-8000.app.github.dev/api/users`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
      : "http://localhost:8000/api/users";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id || u.id}>{u.username} ({u.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
