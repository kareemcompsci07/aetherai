/**
 * AetherAI - AI Insights Component
 * File: AIInsights.jsx
 * Purpose: Display AI-generated natural language analysis of training results
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Let AI explain AI to students in simple language.
 */

import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const AIInsights = ({ experimentData }) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (experimentData && experimentData.metrics) {
      fetchInsights();
    }
  }, [experimentData]);

  const fetchInsights = async () => {
    if (!experimentData) return;

    setLoading(true);
    setError('');
    
    try {
      // In full version: call backend API
      // const response = await ApiService.getAIInsights({
      //   model: experimentData.model,
      //   dataset: experimentData.dataset,
      //   accuracy: experimentData.finalAccuracy / 100,
      //   metrics: experimentData.metrics
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock AI-generated insights (in real version: from backend)
      const mockInsights = [
        "🧠 The CNN model learned effectively on the MNIST dataset, achieving excellent accuracy.",
        "📈 Accuracy improved steadily from 10% to 98.3%, showing strong learning progression.",
        "📉 Final loss of 0.054 indicates the model converged well without overfitting.",
        "💡 Tip: Try data augmentation to make the model even more robust to variations."
      ];

      setInsights(mockInsights);
    } catch (err) {
      setError('Failed to generate AI insights. Please try again.');
      console.error('AI Insights Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        AI-Powered Insights 🤖
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Let AI explain your experiment results in simple, educational language.
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          <span className="ml-3 text-gray-400">Generating insights with AI...</span>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-900 bg-opacity-40 border border-red-700 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      ) : insights.length > 0 ? (
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <div
              key={i}
              className="p-4 bg-black bg-opacity-40 rounded-lg border border-cyan-900 hover:border-cyan-700 transition"
            >
              <p className="text-gray-200 text-sm leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🧠</div>
          <p className="text-gray-400 text-sm">AI insights will appear after training</p>
        </div>
      )}

      <div className="mt-6 p-3 bg-gradient-to-r from-purple-900 to-blue-900 bg-opacity-40 border border-purple-800 rounded-lg">
        <h4 className="font-medium text-purple-300 mb-2">💡 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI uses a lightweight NLP model (GPT-2) to generate educational feedback 
          about your experiment — all running on the server so you don't need a GPU.
        </p>
      </div>
    </div>
  );
};

export default AIInsights;
