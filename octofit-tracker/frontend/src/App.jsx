import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";

function getApiBaseUrl() {
  const codespace = import.meta.env.VITE_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api`;
  }
  return "http://localhost:8000/api";
}

export const API_BASE_URL = getApiBaseUrl();

function App() {
  return (
    <Router>
      <>
        <nav className="navbar navbar-expand navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Octofit Tracker</Link>
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </>
    </Router>
  );
}

export default App;
