/**
 * AetherAI - Progress Predictor Component
 * File: ProgressPredictor.jsx
 * Purpose: Predict student's future performance and provide motivational insights
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students see their growth trajectory and stay motivated.
 */

import React, { useState, useEffect } from 'react';

const ProgressPredictor = ({ studentProfile }) => {
  const [prediction, setPrediction] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('prediction');

  // Simulate API call
  useEffect(() => {
    const generatePrediction = () => {
      // Mock prediction based on student profile
      const mockPrediction = {
        student_id: studentProfile?.student_id || 'student_123',
        prediction_date: new Date().toISOString(),
        current_level: studentProfile?.current_level || 'beginner',
        predicted_accuracy: 
          (studentProfile?.best_accuracy || 0) >= 0.98 ? 0.992 :
          (studentProfile?.best_accuracy || 0) >= 0.95 ? 0.97 : 0.91,
        predicted_loss: 
          (studentProfile?.best_accuracy || 0) >= 0.98 ? 0.021 :
          (studentProfile?.best_accuracy || 0) >= 0.95 ? 0.043 : 0.089,
        confidence_score: 
          (studentProfile?.projects_completed || 0) >= 3 ? 0.85 : 0.72,
        confidence_meter: '🌕🌕🌕🌕🌑',
        explanation: 
          (studentProfile?.projects_completed || 0) >= 3 ? 
          'Based on consistent improvement across multiple experiments' :
          'Based on recent performance with moderate data history',
        suggestions: [
          'Continue practicing with different datasets',
          'Try adjusting learning rate and batch size',
          'Experiment with different model architectures'
        ],
        next_experiment_type: 'MNIST with deeper CNN',
        expected_training_time_minutes: 240
      };

      const mockInsights = {
        insights: [
          (studentProfile?.best_accuracy || 0) >= 0.98 ? 
            '🎉 You\'ve achieved expert-level accuracy! Your models are highly effective.' :
            (studentProfile?.best_accuracy || 0) >= 0.95 ?
            '🚀 You\'re on an excellent trajectory! Keep pushing for that 98%+ accuracy.' :
            '📈 Solid performance! With a few adjustments, you can reach the next level.',
          (studentProfile?.improvement_rate || 0) > 0.1 ?
            '🔥 You\'re improving rapidly! Your learning curve is impressive.' :
            '✅ Steady progress! You\'re building valuable skills with each experiment.',
          (studentProfile?.projects_completed || 0) >= 5 ?
            '🏆 You\'ve completed multiple projects! This breadth of experience is valuable.' :
            '📚 You\'re building a strong portfolio of AI experiments.'
        ],
        encouragement: `Keep going, ${studentProfile?.name || 'Student'} from ${studentProfile?.country || 'your country'}! Your dedication to learning AI is inspiring the next generation of innovators.`,
        growth_metrics: {
          total_experiments: studentProfile?.past_experiments?.length || 3,
          best_accuracy: studentProfile?.best_accuracy || 0.983,
          improvement_rate: studentProfile?.improvement_rate || 0.15,
          projects_completed: studentProfile?.projects_completed || 5
        }
      };

      setTimeout(() => {
        setPrediction(mockPrediction);
        setInsights(mockInsights);
        setLoading(false);
      }, 1500);
    };

    generatePrediction();
  }, [studentProfile]);

  const formatAccuracy = (acc) => {
    return (acc * 100).toFixed(2) + '%';
  };

  const getConfidenceColor = (score) => {
    if (score >= 0.8) return 'text-green-400';
    if (score >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Progress Predictor 📈
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        See your predicted performance and growth trajectory. Stay motivated with personalized insights.
      </p>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="space-y-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="text-gray-400">Analyzing your learning journey...</p>
          </div>
        </div>
      ) : null}

      {!loading && (
        <>
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('prediction')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'prediction'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Prediction
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'insights'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Insights
            </button>
          </div>

          {/* Prediction Tab */}
          {activeTab === 'prediction' && prediction && (
            <div className="space-y-6">
              {/* Predicted Accuracy */}
              <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 bg-opacity-40 border border-blue-700 rounded-lg">
                <div className="text-sm text-blue-300 mb-1">Predicted Accuracy</div>
                <div className="text-3xl font-bold text-white">{formatAccuracy(prediction.predicted_accuracy)}</div>
                <div className="text-blue-300 text-sm mt-1">Next experiment: {prediction.next_experiment_type}</div>
              </div>

              {/* Predicted Loss */}
              <div className="p-4 bg-gradient-to-r from-purple-900 to-pink-900 bg-opacity-40 border border-purple-700 rounded-lg">
                <div className="text-sm text-purple-300 mb-1">Predicted Loss</div>
                <div className="text-3xl font-bold text-white">{prediction.predicted_loss.toFixed(3)}</div>
                <div className="text-purple-300 text-sm mt-1">Lower is better</div>
              </div>

              {/* Confidence */}
              <div className="p-4 bg-gradient-to-r from-green-900 to-emerald-900 bg-opacity-40 border border-green-700 rounded-lg">
                <div className="text-sm text-green-300 mb-1">Prediction Confidence</div>
                <div className="flex items-center space-x-2">
                  <div className={`text-xl font-bold ${getConfidenceColor(prediction.confidence_score)}`}>
                    {(prediction.confidence_score * 100).toFixed(1)}%
                  </div>
                  <div className="text-lg">{prediction.confidence_meter}</div>
                </div>
                <div className="text-green-300 text-sm mt-1">{prediction.explanation}</div>
              </div>

              {/* Suggestions */}
              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">💡 Improvement Suggestions</h4>
                <div className="space-y-2">
                  {prediction.suggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className="p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-200 text-sm">{suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Training Time */}
              <div className="p-4 bg-gradient-to-r from-orange-900 to-red-900 bg-opacity-40 border border-orange-700 rounded-lg">
                <div className="text-sm text-orange-300 mb-1">Expected Training Time</div>
                <div className="text-xl font-bold text-white">{prediction.expected_training_time_minutes} minutes</div>
              </div>
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === 'insights' && insights && (
            <div className="space-y-6">
              {/* Motivational Insights */}
              <div>
                <h4 className="font-semibold text-green-400 mb-3">🌟 Motivational Insights</h4>
                <div className="space-y-3">
                  {insights.insights.map((insight, i) => (
                    <div
                      key={i}
                      className="p-3 bg-gradient-to-r from-green-900 to-emerald-900 bg-opacity-40 border border-green-700 rounded-lg"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-200 text-sm">{insight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encouragement */}
              <div className="p-4 bg-gradient-to-r from-pink-900 to-rose-900 bg-opacity-40 border border-pink-700 rounded-lg">
                <div className="text-sm text-pink-300 mb-1">Personal Encouragement</div>
                <div className="text-white italic">"{insights.encouragement}"</div>
              </div>

              {/* Growth Metrics */}
              <div>
                <h4 className="font-semibold text-blue-400 mb-3">📊 Growth Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
                    <div className="text-sm text-blue-300">Total Experiments</div>
                    <div className="text-xl font-bold text-white">{insights.growth_metrics.total_experiments}</div>
                  </div>
                  <div className="p-3 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
                    <div className="text-sm text-blue-300">Best Accuracy</div>
                    <div className="text-xl font-bold text-white">{formatAccuracy(insights.growth_metrics.best_accuracy)}</div>
                  </div>
                  <div className="p-3 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
                    <div className="text-sm text-blue-300">Improvement Rate</div>
                    <div className="text-xl font-bold text-white">{(insights.growth_metrics.improvement_rate * 100).toFixed(1)}%</div>
                  </div>
                  <div className="p-3 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
                    <div className="text-sm text-blue-300">Projects Completed</div>
                    <div className="text-xl font-bold text-white">{insights.growth_metrics.projects_completed}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes your past experiments to predict future performance. 
          In the full version, this connects to a machine learning model that forecasts your growth.
        </p>
      </div>
    </div>
  );
};

export default ProgressPredictor;
