import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Documentation: VITE_CODESPACE_NAME must be defined in your environment (e.g., .env.local)
// For Codespaces, set VITE_CODESPACE_NAME to your codespace name (e.g., myspace-1234)
// The app will safely fallback to localhost if not set.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
