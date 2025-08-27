/**
 * AetherAI - Model Selector Component
 * File: ModelSelector.jsx
 * Purpose: Allow students to choose AI architecture (CNN, Transformer, etc.)
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: No GPU? No problem. Just pick a model and train.
 */

import React, { useState } from 'react';

const ModelSelector = ({ onModelSelect }) => {
  const [selectedModel, setSelectedModel] = useState('');
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customLayers, setCustomLayers] = useState('');

  const models = [
    {
      id: 'cnn',
      name: 'CNN',
      description: 'Convolutional Neural Network',
      useCase: 'Image Classification (e.g. MNIST, CIFAR-10)',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'transformer',
      name: 'Transformer',
      description: 'Attention-based Architecture',
      useCase: 'Text Classification, NLP',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'mlp',
      name: 'MLP',
      description: 'Multi-Layer Perceptron',
      useCase: 'Simple tabular data',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'resnet',
      name: 'ResNet-18',
      description: 'Deep Residual Network',
      useCase: 'Advanced image tasks',
      color: 'from-red-500 to-orange-500'
    }
  ];

  const handleSelect = (modelId) => {
    setSelectedModel(modelId);
    onModelSelect?.(modelId);
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Model Architecture
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Choose a pre-trained architecture or build a simple custom one.
      </p>

      {/* Model Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {models.map((model) => (
          <div
            key={model.id}
            onClick={() => handleSelect(model.id)}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all
              ${selectedModel === model.id
                ? 'border-cyan-400 bg-cyan-400 bg-opacity-20 scale-105'
                : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
              }`}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${model.color} mb-3 flex items-center justify-center`}>
              <span className="text-black font-bold text-sm">{model.name}</span>
            </div>
            <h4 className="font-semibold text-white">{model.description}</h4>
            <p className="text-gray-400 text-sm mt-1">{model.useCase}</p>
            {selectedModel === model.id && (
              <div className="mt-2 text-cyan-400 text-xs font-medium">✓ Selected</div>
            )}
          </div>
        ))}
      </div>

      {/* Custom Model Option */}
      <div className="border-t border-gray-700 pt-6">
        <button
          onClick={() => setIsCustomOpen(!isCustomOpen)}
          className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition"
        >
          <span className="text-sm">⚙️ Build a simple custom model</span>
          <svg
            className={`w-4 h-4 transform transition ${isCustomOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isCustomOpen && (
          <div className="mt-4 p-4 bg-black bg-opacity-40 rounded-lg border border-gray-700">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Hidden Layers:
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={customLayers}
              onChange={(e) => setCustomLayers(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500"
              placeholder="e.g. 3"
            />
            <p className="text-xs text-gray-500 mt-2">
              We'll generate a simple MLP with your configuration.
            </p>
            <button
              onClick={() => {
                if (customLayers) {
                  setSelectedModel(`mlp-${customLayers}`);
                  onModelSelect?.(`mlp-${customLayers}`);
                }
              }}
              disabled={!customLayers}
              className="mt-3 w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 disabled:from-gray-700 disabled:to-gray-700 text-black text-sm font-bold rounded-lg hover:from-cyan-400 hover:to-blue-500 disabled:hover:from-gray-700 disabled:hover:to-gray-700 transition"
            >
              Generate Model
            </button>
          </div>
        )}
      </div>

      {/* Selected Model Feedback */}
      {selectedModel && (
        <div className="mt-6 p-3 bg-gradient-to-r from-gray-900 to-black rounded-lg border border-cyan-900 bg-opacity-60">
          <strong className="text-cyan-400">Selected:</strong>
          <span className="text-gray-300 ml-2">
            {selectedModel.startsWith('mlp-')
              ? `Custom MLP (${selectedModel.split('-')[1]} layers)`
              : models.find(m => m.id === selectedModel)?.name
            }
          </span>
        </div>
      )}
    </div>
  );
};

export default ModelSelector;
