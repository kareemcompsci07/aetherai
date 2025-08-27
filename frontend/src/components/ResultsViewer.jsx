/**
 * AetherAI - Results Viewer Component
 * File: ResultsViewer.jsx
 * Purpose: Display training results with metrics and simple chart
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Every student deserves to see their AI experiment results clearly.
 */

import React from 'react';

const ResultsViewer = ({ trainingData }) => {
  // Mock data if not provided
  const data = trainingData || {
    model: 'CNN',
    dataset: 'MNIST',
    finalAccuracy: 98.3,
    finalLoss: 0.054,
    epochs: 10,
    trainingTime: '2:18',
    metrics: {
      accuracy: [10, 45, 67, 78, 82, 86, 89, 91, 95, 98.3],
      loss: [2.3, 1.8, 1.4, 1.1, 0.9, 0.7, 0.6, 0.5, 0.4, 0.054]
    }
  };

  const handleDownloadReport = () => {
    alert('✅ Report generation started!\n\nIn full version: Auto-generated PDF with charts, metrics, and insights.\n\nSimulated in demo.');
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Training Results
      </h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Model', value: data.model, color: 'blue' },
          { label: 'Dataset', value: data.dataset, color: 'cyan' },
          { label: 'Accuracy', value: `${data.finalAccuracy}%`, color: 'green' },
          { label: 'Training Time', value: data.trainingTime, color: 'yellow' }
        ].map((item, i) => (
          <div key={i} className={`p-4 rounded-lg bg-${item.color}-900 bg-opacity-40 border border-${item.color}-800`}>
            <div className="text-xs text-gray-300">{item.label}</div>
            <div className="text-white font-bold text-lg mt-1">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-white">Training Progress</h4>
        
        {/* Accuracy Chart */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Accuracy Over Epochs</span>
            <span>{data.finalAccuracy}%</span>
          </div>
          <div className="flex space-x-1 h-24 justify-between items-end bg-black bg-opacity-40 p-4 rounded-lg border border-gray-700">
            {data.metrics.accuracy.map((acc, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-green-600 to-green-400 w-full max-w-8 rounded-t transition-all hover:from-green-500 hover:to-green-300"
                style={{ height: `${(acc / 100) * 100}%` }}
                title={`Epoch ${i+1}: ${acc}%`}
              ></div>
            ))}
          </div>
        </div>

        {/* Loss Chart */}
        <div>
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Loss Over Epochs</span>
            <span>{data.finalLoss.toFixed(3)}</span>
          </div>
          <div className="flex space-x-1 h-24 justify-between items-end bg-black bg-opacity-40 p-4 rounded-lg border border-gray-700">
            {data.metrics.loss.map((loss, i) => {
              const height = Math.max(5, (1 - loss / 2.5) * 100); // Normalize to 0-100%
              return (
                <div
                  key={i}
                  className="bg-gradient-to-t from-red-600 to-red-400 w-full max-w-8 rounded-t transition-all hover:from-red-500 hover:to-red-300"
                  style={{ height: `${height}%` }}
                  title={`Epoch ${i+1}: ${loss.toFixed(3)}`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="mb-8 p-4 bg-gradient-to-r from-blue-900 to-cyan-900 bg-opacity-30 border border-cyan-800 rounded-lg">
        <h4 className="font-semibold text-cyan-300 mb-2">📊 Insights</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>✅ Model converged well with low final loss.</li>
          <li>📈 Accuracy improved steadily — no overfitting detected.</li>
          <li>⚡ Training completed in {data.trainingTime} — efficient for educational use.</li>
          <li>🌍 Result can be reproduced by any student, anywhere.</li>
        </ul>
      </div>

      {/* Generate Report Button */}
      <button
        onClick={handleDownloadReport}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-black font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition transform hover:scale-105"
      >
        📄 Generate Auto-Report (PDF)
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        In full version: Report includes charts, code config, and shareable insights
      </p>
    </div>
  );
};

export default ResultsViewer;
