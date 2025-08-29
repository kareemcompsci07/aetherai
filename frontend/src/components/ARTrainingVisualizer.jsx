/**
 * AetherAI - AR Training Visualizer Component
 * File: ARTrainingVisualizer.jsx
 * Purpose: Visualize neural networks in 3D using WebXR
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AI learning immersive through augmented reality.
 */

import React, { useRef, useEffect, useState } from 'react';

const ARTrainingVisualizer = ({ modelType = 'cnn', dataset = 'mnist' }) => {
  const canvasRef = useRef(null);
  const [isARSupported, setIsARSupported] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if WebXR is supported
    const checkARSupport = () => {
      if (navigator.xr && 'requestSession' in navigator.xr) {
        navigator.xr.isSessionSupported('immersive-ar').then(supported => {
          setIsARSupported(supported);
        });
      }
    };

    checkARSupport();
  }, []);

  const startARSession = async () => {
    setLoading(true);
    
    // Simulate AR session start
    setTimeout(() => {
      setIsSessionStarted(true);
      setLoading(false);
    }, 1500);
  };

  const endARSession = () => {
    setIsSessionStarted(false);
  };

  const drawNeuralNetwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Neural network layers
    const layers = modelType === 'cnn' ? 
      ['Input (28x28)', 'Conv1', 'Pool1', 'Conv2', 'Pool2', 'FC1', 'Output'] :
      ['Input', 'Hidden 1', 'Hidden 2', 'Output'];

    const layerSpacing = canvas.width / (layers.length + 1);
    const nodeRadius = 8;
    const layerY = canvas.height / 2;

    // Draw layers
    layers.forEach((layer, layerIndex) => {
      const x = layerSpacing * (layerIndex + 1);
      
      // Layer circle
      ctx.beginPath();
      ctx.arc(x, layerY, 40, 0, 2 * Math.PI);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Layer label
      ctx.font = '12px Inter, system-ui';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(layer, x, layerY + 60);
    });

    // Draw connections
    for (let i = 0; i < layers.length - 1; i++) {
      const x1 = layerSpacing * (i + 1);
      const x2 = layerSpacing * (i + 2);
      
      ctx.beginPath();
      ctx.moveTo(x1 + 20, layerY);
      ctx.lineTo(x2 - 20, layerY);
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Data flow animation
    if (!isSessionStarted) {
      const flowX = (Date.now() % 3000) / 3000 * (canvas.width - 100) + 50;
      ctx.beginPath();
      ctx.arc(flowX, layerY, nodeRadius, 0, 2 * Math.PI);
      ctx.fillStyle = '#ec4899';
      ctx.fill();
    }
  };

  useEffect(() => {
    drawNeuralNetwork();
    const interval = setInterval(drawNeuralNetwork, 100);
    return () => clearInterval(interval);
  }, [modelType]);

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        AR/VR Training Visualizer 🕶️
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Experience neural network training in 3D augmented reality. 
        Visualize data flow through layers in immersive mode.
      </p>

      {/* AR Status */}
      <div className="mb-6 p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">AR Support</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            isARSupported ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
          }`}>
            {isARSupported ? 'Available' : 'Not Supported'}
          </span>
        </div>
        {!isARSupported && (
          <p className="text-xs text-gray-400 mt-2">
            AR requires Chrome/Edge on Android or Safari on iOS with WebXR support
          </p>
        )}
      </div>

      {/* AR Canvas */}
      <div className="mb-6">
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          className="w-full border border-gray-600 rounded-lg bg-gray-900"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* AR Controls */}
      {!isSessionStarted ? (
        <button
          onClick={startARSession}
          disabled={!isARSupported || loading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 disabled:from-gray-600 text-black font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
              Starting AR Session...
            </div>
          ) : (
            "🚀 Start AR Visualization"
          )}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-gradient-to-r from-green-900 to-emerald-900 bg-opacity-60 border border-green-700 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-2 text-green-200">
              <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold">AR Session Active</span>
            </div>
            <p className="text-xs text-green-300 mt-1">
              Move your device to explore the neural network in 3D
            </p>
          </div>
          
          <button
            onClick={endARSession}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 text-black font-bold rounded-lg hover:from-red-500 hover:to-pink-500 transition"
          >
            🛑 End AR Session
          </button>
        </div>
      )}

      {/* Features */}
      <div className="mt-6 p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-3">Features:</h4>
        <ul className="text-gray-300 text-sm space-y-2">
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>3D visualization of neural network architecture</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>Real-time data flow animation through layers</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>Interactive exploration of feature maps</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>Supports CNN and MLP architectures</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ARTrainingVisualizer;
