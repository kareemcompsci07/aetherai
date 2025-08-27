/**
 * AetherAI - Frontend App Component
 * Created by: Kareem Mostafa
 * Location: Future City, Cairo, Egypt
 * Year: 2025
 * Vision: Making AI research accessible for students without GPUs
 */

import React, { useState, useEffect } from 'react';

const App = () => {
  const [backendStatus, setBackendStatus] = useState('checking...');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Simulate backend health check (will connect to /health later)
  useEffect(() => {
    fetch('http://localhost:8000/health')
      .then(res => res.json())
      .then(data => {
        setBackendStatus(data.status === 'healthy' ? 'Connected ✅' : 'Error ❌');
      })
      .catch(err => {
        setBackendStatus('Not reachable (Run backend) ⚠️');
      });

    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navbar */}
      <nav className="bg-black bg-opacity-50 backdrop-blur-md border-b border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-bold">Aether<span className="text-cyan-400">AI</span></h1>
          </div>
          <div className="text-sm text-gray-300">v0.1.0</div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Democratizing <span className="text-cyan-400">AI Research</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
            A free, open-source platform for high school & university students to run AI experiments — <strong>even without a GPU</strong>.
          </p>
          <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold px-6 py-3 rounded-full shadow-lg">
            Built in Egypt for the World 🌍
          </div>
        </section>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Status Card */}
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-3">Backend Status</h3>
            <p className="text-cyan-400 font-mono text-lg">{backendStatus}</p>
          </div>

          {/* Time Card */}
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-3">Local Time</h3>
            <p className="text-yellow-300 text-lg font-bold">{currentTime}</p>
          </div>
        </div>

        {/* Features Preview */}
        <section className="bg-gray-800 bg-opacity-40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Coming Soon</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Upload Datasets (MNIST, CIFAR-10)',
              'Choose Model (CNN, Transformer)',
              'Train on Cloud & Get Results'
            ].map((feat, i) => (
              <div key={i} className="text-center p-4 bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center text-sm font-bold">
                  {i+1}
                </div>
                <p className="text-sm">{feat}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-800">
        <p>Developed by <strong>Kareem Mostafa</strong> | Future City, Cairo, Egypt</p>
        <p className="mt-1">Open-source for students in developing countries 🌎</p>
      </footer>
    </div>
  );
};

export default App;
