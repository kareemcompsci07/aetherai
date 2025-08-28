/**
 * AetherAI - Real-Time Training Simulator
 * File: TrainingSimulator.jsx
 * Purpose: Visualize the training process with animation and real-time updates
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students understand how neural networks learn through visualization.
 */

import React, { useState, useEffect } from 'react';

const TrainingSimulator = ({ modelType = "cnn", dataset = "mnist" }) => {
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [accuracy, setAccuracy] = useState(0.1);
  const [loss, setLoss] = useState(2.3);
  const [batch, setBatch] = useState(0);
  const [totalBatches, setTotalBatches] = useState(100);
  const [neuronActivity, setNeuronActivity] = useState([]);
  const [showBackprop, setShowBackprop] = useState(false);

  // Initialize neuron activity
  useEffect(() => {
    setNeuronActivity([
      Array(5).fill(0),
      Array(8).fill(0),
      Array(6).fill(0)
    ]);
  }, []);

  const startTraining = () => {
    setIsTraining(true);
    setEpoch(0);
    setAccuracy(0.1);
    setLoss(2.3);
    simulateEpoch();
  };

  const simulateEpoch = () => {
    let currentBatch = 0;
    const batchInterval = setInterval(() => {
      currentBatch++;
      setBatch(currentBatch);

      // Simulate accuracy and loss change
      setAccuracy(prev => Math.min(0.99, prev + Math.random() * 0.02));
      setLoss(prev => Math.max(0.01, prev - Math.random() * 0.05));

      // Simulate neuron activity
      setNeuronActivity([
        Array(5).fill(Math.random()),
        Array(8).fill(Math.random()),
        Array(6).fill(Math.random())
      ]);

      // Show backpropagation every 20 batches
      if (currentBatch % 20 === 0) {
        setShowBackprop(true);
        setTimeout(() => setShowBackprop(false), 800);
      }

      if (currentBatch >= totalBatches) {
        clearInterval(batchInterval);
        
        // End of epoch
        setEpoch(prev => prev + 1);
        setBatch(0);

        if (epoch < 9) {
          // Start next epoch after delay
          setTimeout(simulateEpoch, 1000);
        } else {
          // Training complete
          setIsTraining(false);
        }
      }
    }, 50); // Update every 50ms for smooth animation
  };

  const stopTraining = () => {
    setIsTraining(false);
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Real-Time Training Simulator 🎮
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Watch your neural network learn in real-time with animated visualization.
      </p>

      {/* Controls */}
      <div className="flex space-x-4 mb-6">
        {!isTraining ? (
          <button
            onClick={startTraining}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-black font-bold rounded-lg hover:from-green-500 hover:to-blue-500 transition"
          >
            ▶️ Start Simulation
          </button>
        ) : (
          <button
            onClick={stopTraining}
            className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 transition"
          >
            ⏹️ Stop
          </button>
        )}
      </div>

      {/* Training Status */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-black bg-opacity-40 rounded-lg">
          <div className="text-xs text-gray-400">Epoch</div>
          <div className="text-white font-bold">{epoch}/10</div>
        </div>
        <div className="p-3 bg-black bg-opacity-40 rounded-lg">
          <div className="text-xs text-gray-400">Batch</div>
          <div className="text-white font-bold">{batch}/{totalBatches}</div>
        </div>
        <div className="p-3 bg-black bg-opacity-40 rounded-lg">
          <div className="text-xs text-gray-400">Accuracy</div>
          <div className="text-cyan-400 font-bold">{(accuracy * 100).toFixed(1)}%</div>
        </div>
        <div className="p-3 bg-black bg-opacity-40 rounded-lg">
          <div className="text-xs text-gray-400">Loss</div>
          <div className="text-yellow-400 font-bold">{loss.toFixed(3)}</div>
        </div>
      </div>

      {/* Neural Network Visualization */}
      <div className="mb-6">
        <h4 className="font-semibold text-purple-300 mb-3">Neural Network 🧠</h4>
        <div className="flex justify-between items-center space-x-4 p-4 bg-gray-900 rounded-lg">
          {neuronActivity.map((layer, layerIndex) => (
            <div key={layerIndex} className="flex flex-col items-center space-y-2">
              {layer.map((activity, neuronIndex) => (
                <div
                  key={neuronIndex}
                  className="w-6 h-6 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: `rgba(17, 244, 255, ${activity})`,
                    boxShadow: activity > 0.7 
                      ? '0 0 10px rgba(17, 244, 255, 0.7)' 
                      : 'none'
                  }}
                ></div>
              ))}
              <div className="text-xs text-gray-400">
                {layerIndex === 0 ? 'Input' : layerIndex === 1 ? 'Hidden' : 'Output'}
              </div>
            </div>
          ))}
          
          {/* Connection Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {neuronActivity.slice(0, -1).map((layer, layerIndex) => (
              <div key={layerIndex} className="relative">
                {layer.map((_, neuronIndex) => (
                  <div
                    key={neuronIndex}
                    className="absolute w-px h-full bg-gray-600"
                    style={{
                      left: `${(layerIndex + 1) * 25}%`,
                      top: 0
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Backpropagation Animation */}
      {showBackprop && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-900 to-orange-900 bg-opacity-40 border border-red-700 rounded-lg animate-pulse">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-ping"></div>
            <span className="text-red-200 font-bold">🔄 Backpropagation in Progress!</span>
          </div>
          <p className="text-red-300 text-sm mt-1">
            Adjusting weights based on error gradient...
          </p>
        </div>
      )}

      {/* Info */}
      <div className="p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">💡 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          This simulation shows how neural networks learn through forward propagation 
          and backpropagation. In a real system, this would connect to actual training outputs.
        </p>
      </div>
    </div>
  );
};

export default TrainingSimulator;
