/**
 * AetherAI - Frontend Entry Point
 * File: main.jsx
 * Purpose: Initializes React app and mounts it to the DOM
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Every student, anywhere, deserves access to AI research tools.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Get the root element from index.html
const container = document.getElementById('root');

// Create React root
const root = ReactDOM.createRoot(container);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log startup message (helpful for debugging from mobile)
console.log(
  '%cAetherAI Frontend Started 🚀',
  'color: #00FFFF; font-weight: bold; font-size: 14px;'
);
console.log('Developer: Kareem Mostafa (Egypt)');
console.log('Vision: Democratizing AI for students in developing countries');
