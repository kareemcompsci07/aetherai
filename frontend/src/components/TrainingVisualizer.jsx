/**
 * AetherAI - Training Visualizer Component
 * File: TrainingVisualizer.jsx
 * Purpose: Visualize training progress with interactive charts
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students understand how neural networks learn.
 */

import React, { useState } from 'react';

const TrainingVisualizer = ({ metrics, modelType = "cnn" }) => {
  const [activeTab, setActiveTab] = useState('metrics');
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  // Mock data for visualization
  const accuracyData = metrics?.accuracy || [0.1, 0.45, 0.67, 0.78, 0.82, 0.86, 0.89, 0.91, 0.95, 0.983];
  const lossData = metrics?.loss || [2.3, 1.8, 1.4, 1.1, 0.9, 0.7, 0.6, 0.5, 0.4, 0.054];

  // Generate confusion matrix (mock)
  const classes = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const confusionMatrix = classes.map(() => 
    classes.map(() => Math.floor(Math.random() * 15) + 1)
  );
  // Make diagonal stronger (model is somewhat accurate)
  confusionMatrix.forEach((row, i) => row[i] = Math.floor(Math.random() * 30) + 20);

  // Feature maps simulation
  const featureMaps = [
    'https://via.placeholder.com/64/00FFFF/000000?text=Input',
    'https://via.placeholder.com/64/0088FF/FFFFFF?text=Conv1',
    'https://via.placeholder.com/64/0055AA/FFFFFF?text=Conv2',
    'https://via.placeholder.com/64/002277/FFFFFF?text=Output'
  ];

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Training Visualizer 📊
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Interactive visualization of your model's learning process.
      </p>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-gray-600">
        {[
          { id: 'metrics', label: 'Metrics', icon: '📈' },
          { id: 'confusion', label: 'Confusion Matrix', icon: '🔢' },
          { id: 'features', label: 'Feature Maps', icon: '🖼️' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium capitalize transition ${
              activeTab === tab.id
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Metrics Tab */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          {/* Accuracy Chart */}
          <div>
            <h4 className="text-white font-semibold mb-3">Accuracy Over Epochs</h4>
            <div className="bg-black bg-opacity-40 p-4 rounded-lg">
              <div className="flex items-end h-32 space-x-1">
                {accuracyData.map((acc, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t"
                      style={{ height: `${acc * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-1">{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Epoch</span>
                <span>Accuracy: {(accuracyData[accuracyData.length - 1] * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Loss Chart */}
          <div>
            <h4 className="text-white font-semibold mb-3">Loss Over Epochs</h4>
            <div className="bg-black bg-opacity-40 p-4 rounded-lg">
              <div className="flex items-end h-32 space-x-1">
                {lossData.map((loss, i) => (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t"
                      style={{ height: `${Math.min(loss / 3, 1) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-1">{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Epoch</span>
                <span>Loss: {lossData[lossData.length - 1].toFixed(3)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confusion Matrix Tab */}
      {activeTab === 'confusion' && (
        <div>
          <h4 className="text-white font-semibold mb-3">Confusion Matrix</h4>
          <p className="text-gray-400 text-sm mb-4">Predicted vs Actual labels</p>
          
          <div className="overflow-auto max-h-64">
            <table className="w-full border border-gray-600 text-xs">
              <thead>
                <tr>
                  <th className="p-2 bg-gray-700 border-b border-gray-600"></th>
                  {classes.map(cls => (
                    <th key={cls} className="p-2 bg-gray-700 border-b border-gray-600">Pred: {cls}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {confusionMatrix.map((row, i) => (
                  <tr key={i}>
                    <td className="p-2 bg-gray-700 border-r border-gray-600">Actual: {classes[i]}</td>
                    {row.map((val, j) => (
                      <td
                        key={j}
                        className="p-2 text-center"
                        style={{
                          backgroundColor: i === j 
                            ? `rgba(76, 175, 80, ${val / 50})` 
                            : `rgba(244, 67, 54, ${val / 50})`,
                          color: val > 15 ? 'white' : 'gray'
                        }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-gray-400">
            🟩 = Correct predictions | 🟥 = Misclassifications
          </div>
        </div>
      )}

      {/* Feature Maps Tab */}
      {activeTab === 'features' && (
        <div>
          <h4 className="text-white font-semibold mb-3">Feature Maps Simulation</h4>
          <p className="text-gray-400 text-sm mb-4">How CNN layers detect patterns</p>
          
          <div className="space-y-4">
            {featureMaps.map((src, i) => (
              <div key={i} className="flex items-center space-x-4">
                <span className="text-cyan-400 font-bold text-lg">L{i}</span>
                <img 
                  src={src} 
                  alt={`Layer ${i}`} 
                  className="w-16 h-16 object-cover border border-gray-600"
                />
                <div className="flex-1 bg-gray-700 p-3 rounded">
                  <p className="text-sm">
                    {i === 0 && "Input image: Raw pixel data"}
                    {i === 1 && "Edge detection: Simple features"}
                    {i === 2 && "Pattern recognition: Complex shapes"}
                    {i === 3 && "Final prediction: High-level understanding"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">💡 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          These visualizations help you understand how your model learns. 
          In a real system, they'd connect to actual training outputs.
        </p>
      </div>
    </div>
  );
};

export default TrainingVisualizer;
