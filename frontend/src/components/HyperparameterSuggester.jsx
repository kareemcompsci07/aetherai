/**
 * AetherAI - Hyperparameter Suggester Component
 * File: HyperparameterSuggester.jsx
 * Purpose: Display smart suggestions for training configuration
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students train better models with AI-powered suggestions.
 */

import React, { useState } from 'react';

const HyperparameterSuggester = ({ model, dataset }) => {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getSuggestion = () => {
    if (!model || !dataset) {
      setError('Please select both model and dataset');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // Mock suggestions based on model + dataset
      const mockSuggestions = {
        'cnn-mnist': {
          learning_rate: 0.001,
          batch_size: 32,
          epochs: 10,
          optimizer: 'Adam',
          dropout: 0.5,
          suggestion: 'Standard CNN setup for MNIST. Good balance of speed and accuracy.'
        },
        'mlp-iris': {
          learning_rate: 0.01,
          batch_size: 16,
          epochs: 100,
          optimizer: 'SGD',
          hidden_layers: 2,
          suggestion: 'Small dataset. High learning rate and many epochs for convergence.'
        },
        'lstm-imdb': {
          learning_rate: 0.001,
          batch_size: 32,
          epochs: 10,
          optimizer: 'Adam',
          hidden_dim: 128,
          suggestion: 'Standard LSTM setup for sentiment analysis.'
        },
        'cnn-cifar-10': {
          learning_rate: 0.001,
          batch_size: 32,
          epochs: 20,
          optimizer: 'SGD with momentum',
          suggestion: 'CIFAR-10 has complex images. Deeper network with regularization.'
        }
      };

      const key = `${model.toLowerCase()}-${dataset.toLowerCase()}`;
      const selectedSuggestion = mockSuggestions[key] || mockSuggestions['cnn-mnist'];

      setSuggestion({
        ...selectedSuggestion,
        model,
        dataset,
        timestamp: new Date().toISOString()
      });
      
      setLoading(false);
    }, 1200);
  };

  React.useEffect(() => {
    if (model && dataset) {
      getSuggestion();
    }
  }, [model, dataset]);

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Smart Training Suggestions 💡
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        AI-powered recommendations for optimal training configuration based on your model and dataset.
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          <span className="ml-3 text-gray-400">Generating smart suggestions...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-900 bg-opacity-40 border border-red-700 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      ) : suggestion ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(suggestion).filter(([key]) => 
              !['suggestion', 'model', 'dataset', 'timestamp'].includes(key)
            ).map(([key, value]) => (
              <div
                key={key}
                className="p-3 bg-black bg-opacity-40 rounded-lg border border-cyan-900"
              >
                <div className="text-xs text-gray-400">{key.replace('_', ' ').toUpperCase()}</div>
                <div className="text-white font-bold">{value}</div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-900 to-cyan-900 bg-opacity-40 border border-cyan-800 rounded-lg">
            <h4 className="font-medium text-cyan-300 mb-2">🧠 AI Insight:</h4>
            <p className="text-gray-200 text-sm">{suggestion.suggestion}</p>
          </div>

          <div className="text-xs text-gray-500 text-center">
            Suggestion generated for {suggestion.model.toUpperCase()} on {suggestion.dataset}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">💡</div>
          <p className="text-gray-400 text-sm">Suggestions will appear when model and dataset are selected</p>
        </div>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">⚙️ How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI uses educational best practices to suggest optimal hyperparameters 
          based on your model and dataset — helping you train better models from the start.
        </p>
      </div>
    </div>
  );
};

export default HyperparameterSuggester;
