/**
 * AetherAI - Carbon Savings Calculator
 * File: CarbonSavings.jsx
 * Purpose: Show environmental impact of using simulated training
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Every AI experiment should be sustainable.
 */

import React from 'react';

const CarbonSavings = ({ trainingTimeMinutes = 240 }) => {
  // Constants
  const GPU_POWER_WATTS = 300; // Average GPU power consumption
  const GRID_EMISSIONS = 0.5; // kg CO2 per kWh (global average)
  const TREE_ABSORPTION = 22; // kg CO2 absorbed per tree per year

  // Calculations
  const hours = trainingTimeMinutes / 60;
  const gpuEnergyKWh = (GPU_POWER_WATTS * hours) / 1000;
  const carbonSavedKg = gpuEnergyKWh * GRID_EMISSIONS;
  const treesEquivalent = carbonSavedKg / TREE_ABSORPTION;
  const carKmEquivalent = (carbonSavedKg / 0.12) * 100; // Average: 120g CO2 per km

  return (
    <div className="bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 bg-opacity-80 backdrop-blur-sm border border-green-700 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-2xl font-bold mb-6 text-green-400 flex items-center">
        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
        Environmental Impact 🌱
      </h3>

      <p className="text-gray-300 mb-6 text-sm leading-relaxed">
        By using simulated training instead of a physical GPU, you're helping reduce 
        carbon emissions and energy consumption. Here's your positive impact.
      </p>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { 
            label: 'Energy Saved', 
            value: `${gpuEnergyKWh.toFixed(2)} kWh`, 
            desc: 'Enough to power a laptop for 30 hours',
            icon: '⚡'
          },
          { 
            label: 'Carbon Saved', 
            value: `${carbonSavedKg.toFixed(2)} kg CO₂`, 
            desc: 'Like planting 0.1 trees',
            icon: '🌍'
          },
          { 
            label: 'Car Distance', 
            value: `${Math.round(carKmEquivalent)} km`, 
            desc: 'Avoided emissions from driving',
            icon: '🚗'
          },
          { 
            label: 'Tree Equivalent', 
            value: `${treesEquivalent.toFixed(1)} trees`, 
            desc: 'CO₂ absorption per year',
            icon: '🌳'
          }
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-black bg-opacity-40 rounded-lg border border-green-800">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-green-400 text-lg font-bold">{stat.value}</div>
            <div className="text-gray-300 text-xs">{stat.label}</div>
            <div className="text-gray-500 text-xs mt-1">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* Environmental Message */}
      <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 bg-opacity-60 border border-blue-700 rounded-lg mb-6">
        <h4 className="font-bold text-blue-300 mb-2">💚 Why This Matters</h4>
        <p className="text-gray-300 text-sm">
          Training AI models on GPUs consumes significant energy. 
          AetherAI's simulation mode allows students to learn AI 
          without contributing to carbon emissions.
        </p>
      </div>

      {/* Call to Action */}
      <div className="p-4 bg-gradient-to-r from-yellow-900 to-orange-900 bg-opacity-60 border border-yellow-700 rounded-lg">
        <h4 className="font-bold text-yellow-300 mb-2">📢 Spread the Word</h4>
        <p className="text-gray-300 text-sm">
          Share your environmental impact! 
          <br />
          <button className="text-cyan-400 hover:underline text-sm">
            Generate Impact Report →
          </button>
        </p>
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-center text-xs text-gray-500">
        Calculations based on average GPU power (300W) and global grid emissions (0.5kg CO₂/kWh)
      </div>
    </div>
  );
};

export default CarbonSavings;
