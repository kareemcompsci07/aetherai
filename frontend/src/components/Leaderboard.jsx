/**
 * AetherAI - Global Leaderboard Component
 * File: Leaderboard.jsx
 * Purpose: Display top student performances worldwide
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Inspire students through healthy competition and recognition.
 */

import React, { useState } from 'react';

const Leaderboard = () => {
  const [activeDataset, setActiveDataset] = useState('mnist');

  // Mock data (in full version: fetch from server)
  const leaderboardData = {
    mnist: [
      { rank: 1, name: "Lina Chen", accuracy: 99.2, school: "Beijing International School", country: "China" },
      { rank: 2, name: "Ahmed Hassan", accuracy: 99.1, school: "Future City STEM Academy", country: "Egypt" },
      { rank: 3, name: "Emma Johnson", accuracy: 99.0, school: "Silicon Valley High", country: "USA" },
      { rank: 4, name: "Yusuf Mohammed", accuracy: 98.9, school: "Cairo Science Academy", country: "Egypt" },
      { rank: 5, name: "Satoshi Tanaka", accuracy: 98.8, school: "Tokyo Tech Prep", country: "Japan" }
    ],
    cifar10: [
      { rank: 1, name: "Nina Patel", accuracy: 95.7, school: "Mumbai AI Academy", country: "India" },
      { rank: 2, name: "Carlos Rodriguez", accuracy: 95.5, school: "Mexico City Tech", country: "Mexico" },
      { rank: 3, name: "Fatima Ali", accuracy: 95.3, school: "Dubai STEM School", country: "UAE" },
      { rank: 4, name: "Kareem Mostafa", accuracy: 95.1, school: "El-Abtal Language School", country: "Egypt" },
      { rank: 5, name: "Olivia Smith", accuracy: 94.9, school: "London Science Academy", country: "UK" }
    ],
    imdb: [
      { rank: 1, name: "Amina Yusuf", accuracy: 94.8, school: "Lagos AI Institute", country: "Nigeria" },
      { rank: 2, name: "Diego Fernandez", accuracy: 94.6, school: "Buenos Aires Tech", country: "Argentina" },
      { rank: 3, name: "Chen Wei", accuracy: 94.4, school: "Shanghai International", country: "China" },
      { rank: 4, name: "Sarah Johnson", accuracy: 94.2, school: "Boston STEM Academy", country: "USA" },
      { rank: 5, name: "Yuki Tanaka", accuracy: 94.0, school: "Osaka Tech Prep", country: "Japan" }
    ]
  };

  const getMedal = (rank) => {
    switch(rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  const currentData = leaderboardData[activeDataset] || leaderboardData.mnist;

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Global Leaderboard 🌍
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        See how students worldwide are performing on AI challenges. 
        Your results could be here next!
      </p>

      {/* Dataset Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-gray-600">
        {[
          { id: 'mnist', label: 'MNIST', icon: '🔢' },
          { id: 'cifar10', label: 'CIFAR-10', icon: '🖼️' },
          { id: 'imdb', label: 'IMDB', icon: '📝' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveDataset(tab.id)}
            className={`px-4 py-2 text-sm font-medium capitalize transition ${
              activeDataset === tab.id
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-hidden rounded-lg border border-gray-600">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="text-left p-3 text-xs font-semibold text-gray-300 uppercase">Rank</th>
              <th className="text-left p-3 text-xs font-semibold text-gray-300 uppercase">Student</th>
              <th className="text-left p-3 text-xs font-semibold text-gray-300 uppercase">Accuracy</th>
              <th className="text-left p-3 text-xs font-semibold text-gray-300 uppercase">School</th>
              <th className="text-left p-3 text-xs font-semibold text-gray-300 uppercase">Country</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((entry, i) => (
              <tr 
                key={i} 
                className={`${
                  i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'
                } hover:bg-gray-600 transition`}
              >
                <td className="p-3">
                  <span className="font-bold text-cyan-400">
                    {getMedal(entry.rank)}
                  </span>
                </td>
                <td className="p-3">
                  <div className="font-medium text-white">{entry.name}</div>
                </td>
                <td className="p-3">
                  <div className="font-bold text-green-400">{entry.accuracy}%</div>
                </td>
                <td className="p-3">
                  <div className="text-sm text-gray-300">{entry.school}</div>
                </td>
                <td className="p-3">
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span className="text-sm text-gray-300">{entry.country}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Call to Action */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-900 to-indigo-900 bg-opacity-60 border border-blue-700 rounded-lg text-center">
        <h4 className="font-bold text-blue-300 mb-2">🚀 Your Name Could Be Here!</h4>
        <p className="text-gray-300 text-sm">
          Train your best model and submit your results to join the global leaderboard.
          <br />
          <button className="text-cyan-400 hover:underline text-sm">
            How to qualify →
          </button>
        </p>
      </div>

      {/* Info */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Updated daily • Fair competition • No GPU required
      </div>
    </div>
  );
};

export default Leaderboard;
