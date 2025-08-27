/**
 * AetherAI - Custom Model Builder Component
 * File: CustomModelBuilder.jsx
 * Purpose: Allow students to create custom AI models with simple configuration
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: No PhD needed. Just configure and train.
 */

import React, { useState } from 'react';

const CustomModelBuilder = ({ onModelCreated }) => {
  const [config, setConfig] = useState({
    type: 'mlp',
    dataset: 'mnist',
    hidden_layers: 3,
    hidden_size: 128,
    vocab_size: 10000,
    num_layers: 2
  });

  const [status, setStatus] = useState('');

  const modelOptions = [
    { value: 'mlp', label: 'MLP', description: 'For tabular or flattened image data' },
    { value: 'cnn', label: 'CNN', description: 'For image classification (e.g. MNIST, CIFAR-10)' },
    { value: 'lstm', label: 'LSTM', description: 'For text classification (e.g. IMDB)' }
  ];

  const datasetOptions = [
    { value: 'mnist', label: 'MNIST' },
    { value: 'fashion-mnist', label: 'Fashion-MNIST' },
    { value: 'cifar-10', label: 'CIFAR-10' },
    { value: 'imdb', label: 'IMDB' },
    { value: 'sst-2', label: 'SST-2' }
  ];

  const handleCreate = () => {
    setStatus('🚀 Creating custom model... (Simulated)');
    
    // Simulate API call
    setTimeout(() => {
      setStatus(`✅ Custom ${config.type.toUpperCase()} model created for ${config.dataset}!`);
      onModelCreated?.(config);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: ['hidden_layers', 'hidden_size', 'vocab_size', 'num_layers'].includes(name) 
        ? parseInt(value) 
        : value
    }));
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Build Your Own Model
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        No coding needed. Just configure your AI model and start training.
      </p>

      {/* Model Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Model Architecture
        </label>
        <select
          name="type"
          value={config.type}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          {modelOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label} - {opt.description}
            </option>
          ))}
        </select>
      </div>

      {/* Dataset */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Dataset
        </label>
        <select
          name="dataset"
          value={config.dataset}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          {datasetOptions.map(ds => (
            <option key={ds.value} value={ds.value}>{ds.label}</option>
          ))}
        </select>
      </div>

      {/* Hidden Layers */}
      {['mlp', 'cnn'].includes(config.type) && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Hidden Layers: {config.hidden_layers}
          </label>
          <input
            type="range"
            name="hidden_layers"
            min="1"
            max="5"
            value={config.hidden_layers}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      )}

      {/* Hidden Size */}
      {['mlp'].includes(config.type) && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Hidden Layer Size: {config.hidden_size}
          </label>
          <input
            type="range"
            name="hidden_size"
            min="64"
            max="512"
            step="64"
            value={config.hidden_size}
            onChange={handleChange}
            className="w-full"
          />
        </div>
      )}

      {/* LSTM Options */}
      {config.type === 'lstm' && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Vocabulary Size: {config.vocab_size}
            </label>
            <input
              type="range"
              name="vocab_size"
              min="5000"
              max="20000"
              step="5000"
              value={config.vocab_size}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              LSTM Layers: {config.num_layers}
            </label>
            <input
              type="range"
              name="num_layers"
              min="1"
              max="3"
              value={config.num_layers}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </>
      )}

      {/* Create Button */}
      <button
        onClick={handleCreate}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-black font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition transform hover:scale-105"
      >
        🔧 Create Custom Model
      </button>

      {/* Status */}
      {status && (
        <div className="mt-6 p-3 bg-black bg-opacity-40 rounded-lg text-sm font-mono border border-gray-700">
          {status}
        </div>
      )}

      {/* Info */}
      <div className="mt-6 p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-cyan-400 mb-2">💡 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          Your configuration is sent to the server, which builds a real PyTorch model 
          tailored to your dataset and needs — no GPU required.
        </p>
      </div>
    </div>
  );
};

export default CustomModelBuilder;
