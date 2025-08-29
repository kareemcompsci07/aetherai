/**
 * AetherAI - AR Training Visualizer Component (Updated)
 * File: ARTrainingVisualizer.jsx
 * Purpose: Visualize neural networks in 3D using Three.js and WebXR
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AI learning immersive through augmented reality.
 */

import React, { useRef, useEffect, useState } from 'react';
import ARVisualizer from '../lib/ar-visualizer';

const ARTrainingVisualizer = ({ modelType = 'cnn', dataset = 'mnist' }) => {
  const containerRef = useRef(null);
  const visualizerRef = useRef(null);
  const [isARSupported, setIsARSupported] = useState(false);
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if WebXR is supported
    const checkARSupport = () => {
      if (navigator.xr && 'requestSession' in navigator.xr) {
        navigator.xr.isSessionSupported('immersive-ar').then(supported => {
          setIsARSupported(supported);
        }).catch(() => {
          setIsARSupported(false);
        });
      } else {
        setIsARSupported(false);
      }
    };

    checkARSupport();
  }, []);

  useEffect(() => {
    // Initialize AR visualizer
    if (containerRef.current && !visualizerRef.current) {
      try {
        visualizerRef.current = new ARVisualizer(containerRef.current);
      } catch (err) {
        setError('Failed to initialize 3D visualization: ' + err.message);
        console.error('AR Visualizer Error:', err);
      }
    }

    return () => {
      if (visualizerRef.current) {
        visualizerRef.current.dispose();
        visualizerRef.current = null;
      }
    };
  }, []);

  const startARSession = async () => {
    if (!containerRef.current) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Check if immersive AR is supported
      if (isARSupported && navigator.xr) {
        const session = await navigator.xr.requestSession('immersive-ar', {
          requiredFeatures: ['local-floor'],
          optionalFeatures: ['bounded-floor', 'hand-tracking']
        });
        
        // Get XR reference space
        const referenceSpace = await session.requestReferenceSpace('local');
        
        // Set up renderer for XR
        if (visualizerRef.current && visualizerRef.current.renderer) {
          visualizerRef.current.renderer.xr.setSession(session);
        }
        
        // Update UI
        setIsSessionStarted(true);
        setLoading(false);
        
        // Handle session end
        session.addEventListener('end', () => {
          setIsSessionStarted(false);
        });
        
      } else {
        // Fallback to 3D visualization without AR
        if (visualizerRef.current) {
          visualizerRef.current.start();
        }
        setIsSessionStarted(true);
        setLoading(false);
      }
    } catch (err) {
      console.error('AR Session Error:', err);
      setError('AR session could not be started: ' + err.message);
      setLoading(false);
    }
  };

  const endARSession = () => {
    if (visualizerRef.current) {
      visualizerRef.current.stop();
    }
    setIsSessionStarted(false);
  };

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
            isARSupported ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
          }`}>
            {isARSupported ? 'Available' : 'Limited (3D Only)'}
          </span>
        </div>
        {!isARSupported && (
          <p className="text-xs text-gray-400 mt-2">
            AR requires Chrome/Edge on Android or Safari on iOS with WebXR support
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 bg-red-900 bg-opacity-40 border border-red-700 rounded-lg">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* AR Canvas Container */}
      <div className="mb-6">
        <div
          ref={containerRef}
          className="w-full h-64 border border-gray-600 rounded-lg bg-gray-900 overflow-hidden"
          style={{ minHeight: '256px' }}
        >
          {!isSessionStarted && !error && (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              Click "Start AR" to begin visualization
            </div>
          )}
        </div>
      </div>

      {/* AR Controls */}
      {!isSessionStarted ? (
        <button
          onClick={startARSession}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 disabled:from-gray-600 text-black font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
              Starting AR Session...
            </div>
          ) : (
            "🚀 Start 3D Visualization"
          )}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-gradient-to-r from-green-900 to-emerald-900 bg-opacity-60 border border-green-700 rounded-lg text-center">
            <div className="flex items-center justify-center space-x-2 text-green-200">
              <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold">3D Visualization Active</span>
            </div>
            <p className="text-xs text-green-300 mt-1">
              {isARSupported ? 'Move your device to explore in AR' : 'Rotate view with mouse/touch'}
            </p>
          </div>
          
          <button
            onClick={endARSession}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 text-black font-bold rounded-lg hover:from-red-500 hover:to-pink-500 transition"
          >
            🛑 End Visualization
          </button>
        </div>
      )}

      {/* Features */}
      <div className="mt-6 p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-3">Features:</h4>
        <ul className="text-gray-300 text-sm space-y-2">
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>Real 3D rendering using Three.js</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>Dynamic data flow visualization</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>Immersive AR/VR mode (where supported)</span>
          </li>
          <li className="flex items-start">
            <span className="text-cyan-400 mr-2">•</span>
            <span>Fallback to 3D visualization on all devices</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ARTrainingVisualizer;
