/**
 * AetherAI - Experiment Reviewer Component
 * File: ExperimentReviewer.jsx
 * Purpose: Display AI-powered feedback on completed experiments
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students improve their AI experiments with smart feedback.
 */

import React, { useState, useEffect } from 'react';

const ExperimentReviewer = ({ results }) => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!results) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock review based on results
      const accuracy = results.finalAccuracy || 0.983;
      const loss = results.finalLoss || 0.054;
      
      const mockReview = {
        summary: {
          performance_level: accuracy >= 0.95 ? "Excellent" : accuracy >= 0.85 ? "Good" : "Fair",
          emoji: accuracy >= 0.95 ? "🏆" : accuracy >= 0.85 ? "👍" : "💡",
          comment: accuracy >= 0.95 
            ? "Outstanding performance! Your model is highly accurate." 
            : accuracy >= 0.85 
            ? "Solid performance. Good balance of accuracy and training."
            : "Decent start. There's room for improvement.",
          accuracy: `${(accuracy * 100).toFixed(1)}%`,
          loss: loss.toFixed(3)
        },
        strengths: [
          "High accuracy achieved",
          "Low final loss indicates good model fit",
          "Efficient training time"
        ],
        improvement_suggestions: accuracy < 0.95
          ? [
              "Try increasing the number of epochs for better convergence",
              "Consider using data augmentation to improve generalization",
              "For CNN models, adding dropout layers can prevent overfitting"
            ]
          : [
              "Experiment is well-optimized. Try testing on new datasets!",
              "Consider exploring more complex architectures",
              "Share your results with classmates for feedback"
            ],
        technical_insights: [
          "Training curve shows stable convergence",
          "No signs of overfitting detected"
        ],
        encouragement: [
          "Great job! Every experiment teaches you something new.",
          "Keep going! You're building valuable AI skills.",
          "Impressive work! You're on your way to becoming an AI researcher."
        ][Math.floor(Math.random() * 3)]
      };

      setReview(mockReview);
      setLoading(false);
    }, 1200);
  }, [results]);

  if (!results) {
    return (
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl text-center">
        <p className="text-gray-400 text-sm">Run an experiment to get AI-powered feedback</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        AI Experiment Review 📝
      </h3>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          <span className="ml-3 text-gray-400">Generating AI-powered feedback...</span>
        </div>
      ) : review ? (
        <div className="space-y-6">
          {/* Performance Summary */}
          <div className="p-4 bg-gradient-to-r from-blue-900 to-cyan-900 bg-opacity-40 border border-cyan-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-cyan-300">Performance</div>
                <div className="text-2xl font-bold text-white">
                  {review.summary.performance_level} {review.summary.emoji}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-300">Accuracy</div>
                <div className="text-lg font-bold text-cyan-400">{review.summary.accuracy}</div>
                <div className="text-xs text-gray-400">Loss: {review.summary.loss}</div>
              </div>
            </div>
            <p className="text-gray-200 text-sm mt-2">{review.summary.comment}</p>
          </div>

          {/* Strengths */}
          <div>
            <h4 className="font-semibold text-green-400 mb-3">✅ Strengths</h4>
            <div className="space-y-2">
              {review.strengths.map((strength, i) => (
                <div
                  key={i}
                  className="p-3 bg-green-900 bg-opacity-40 border border-green-800 rounded-lg text-sm text-green-200"
                >
                  {strength}
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <h4 className="font-semibold text-yellow-400 mb-3">💡 Improvement Suggestions</h4>
            <div className="space-y-2">
              {review.improvement_suggestions.map((suggestion, i) => (
                <div
                  key={i}
                  className="p-3 bg-gradient-to-r from-yellow-900 to-orange-900 bg-opacity-40 border border-yellow-800 rounded-lg text-sm"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Insights */}
          <div>
            <h4 className="font-semibold text-purple-400 mb-3">🧠 Technical Insights</h4>
            <div className="space-y-2">
              {review.technical_insights.map((insight, i) => (
                <div
                  key={i}
                  className="p-3 bg-purple-900 bg-opacity-40 border border-purple-800 rounded-lg text-sm text-purple-200"
                >
                  {insight}
                </div>
              ))}
            </div>
          </div>

          {/* Encouragement */}
          <div className="p-4 bg-gradient-to-r from-indigo-900 to-purple-900 bg-opacity-60 border border-purple-700 rounded-lg text-center">
            <p className="text-gray-200 italic">"{review.encouragement}"</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-gray-400 text-sm">Feedback will appear after experiment completion</p>
        </div>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes your experiment results and provides educational feedback 
          to help you improve. In the full version, this connects to an AI model on the server.
        </p>
      </div>
    </div>
  );
};

export default ExperimentReviewer;
