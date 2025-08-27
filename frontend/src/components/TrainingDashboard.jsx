/**
 * AetherAI - Training Dashboard Component
 * File: TrainingDashboard.jsx
 * Purpose: Allow students to start training on cloud and monitor progress
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: No GPU? No problem. Train on cloud for free.
 */

import React, { useState } from 'react';

const TrainingDashboard = ({ dataset, model }) => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [trainingTime, setTrainingTime] = useState(0);

  const totalEpochs = 10;
  const fakeLosses = [2.3, 1.8, 1.4, 1.1, 0.9, 0.7, 0.6, 0.5, 0.4, 0.3];
  const fakeAccuracies = [0.1, 0.4, 0.6, 0.7, 0.75, 0.8, 0.83, 0.86, 0.88, 0.9];

  const handleStartTraining = () => {
    if (!dataset || !model) {
      alert('⚠️ Please select dataset and model first');
      return;
    }

    setIsTraining(true);
    setProgress(0);
    setEpoch(0);
    setLoss(null);
    setAccuracy(null);
    setTrainingTime(0);

    // Simulate training loop
    const interval = setInterval(() => {
      setTrainingTime(prev => prev + 1);

      setEpoch(prev => {
        const newEpoch = prev + 1;
        if (newEpoch <= totalEpochs) {
          setLoss(fakeLosses[newEpoch - 1].toFixed(3));
          setAccuracy((fakeAccuracies[newEpoch - 1] * 100).toFixed(1) + '%');
          setProgress((newEpoch / totalEpochs) * 100);
        }
        return newEpoch;
      });

      if (epoch >= totalEpochs) {
        clearInterval(interval);
        setTimeout(() => {
          setIsTraining(false);
        }, 1000);
      }
    }, 800); // Fast simulation for demo
  };

  const handleReset = () => {
    setIsTraining(false);
    setProgress(0);
    setEpoch(0);
    setLoss(null);
    setAccuracy(null);
    setTrainingTime(0);
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Cloud Training Dashboard
      </h3>

      {/* Dataset & Model Info */}
      {dataset && model ? (
        <div className="mb-6 p-4 bg-black bg-opacity-40 rounded-lg border border-gray-700">
          <h4 className="font-semibold text-white mb-1">Training Configuration</h4>
          <div className="text-sm text-gray-300 space-y-1">
            <p><strong>Dataset:</strong> {dataset}</p>
            <p><strong>Model:</strong> {model}</p>
            <p><strong>Device:</strong> <span className="text-cyan-400">Cloud GPU (Free Tier)</span></p>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-800 rounded-lg">
          <p className="text-red-300 text-sm">
            ⚠️ Please select dataset and model first
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>Training Progress</span>
          <span>{epoch}/{totalEpochs} Epochs</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Time: {Math.floor(trainingTime / 60)}:{(trainingTime % 60).toString().padStart(2, '0')} min
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-gray-900 rounded-lg">
          <label className="text-gray-400 text-sm">Loss</label>
          <div className="text-cyan-400 font-bold text-lg mt-1">
            {loss ? loss : '--'}
          </div>
        </div>
        <div className="p-4 bg-gray-900 rounded-lg">
          <label className="text-gray-400 text-sm">Accuracy</label>
          <div className="text-green-400 font-bold text-lg mt-1">
            {accuracy ? accuracy : '--'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {!isTraining ? (
          <button
            onClick={handleStartTraining}
            disabled={!dataset || !model}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 disabled:from-gray-700 disabled:to-gray-700 text-black font-bold py-3 px-6 rounded-lg hover:from-green-400 hover:to-emerald-500 disabled:hover:from-gray-700 disabled:hover:to-gray-700 transition disabled:cursor-not-allowed"
          >
            🚀 Start Training on Cloud
          </button>
        ) : (
          <button
            disabled
            className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-6 rounded-lg cursor-not-allowed"
          >
            ⏳ Training in Progress... {Math.round(progress)}%
          </button>
        )}
        {isTraining && (
          <button
            onClick={handleReset}
            className="px-4 py-3 bg-red-900 text-red-200 rounded-lg hover:bg-red-800"
          >
            Stop
          </button>
        )}
      </div>

      {/* Success Message */}
      {epoch >= totalEpochs && !isTraining && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-900 to-emerald-900 bg-opacity-40 border border-green-700 rounded-lg">
          <div className="text-green-300 font-semibold">✅ Training Completed Successfully!</div>
          <div className="text-sm text-green-200 mt-1">
            Final Accuracy: <strong>{accuracy}</strong> | Duration: {Math.floor(trainingTime / 60)}:{(trainingTime % 60).toString().padStart(2, '0')} min
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingDashboard;
