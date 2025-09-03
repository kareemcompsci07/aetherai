/**
 * AetherAI - Model Interpretability Component
 * File: ModelInterpretability.jsx
 * Purpose: Show explanations for AI model predictions
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students understand how AI models make decisions.
 */

import React, { useState, useEffect } from 'react';

const ModelInterpretability = ({ predictionData }) => {
  const [interpretationReport, setInterpretationReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('explanations');

  // Simulate API call
  useEffect(() => {
    const generateInterpretation = () => {
      // Mock data based on prediction data
      const mockReport = {
        prediction_id: predictionData?.prediction_id || 'pred_123',
        analysis_date: new Date().toISOString(),
        model_type: predictionData?.model_type || 'cnn',
        dataset_type: predictionData?.dataset_type || 'image',
        predicted_class: predictionData?.predicted_class || '8',
        true_class: predictionData?.true_class || '8',
        confidence: predictionData?.confidence || 0.983,
        understanding_score: 96.7,
        explanations: [
          {
            method: 'saliency_maps',
            title: 'Saliency Map Analysis',
            description: 'Visualization showing which pixels most influenced the prediction',
            insights: [
              'The model focused primarily on the central region of the digit',
              'Edge detection patterns are clearly visible in the activation map',
              'Background pixels have minimal influence on the final decision'
            ],
            confidence: 0.92,
            visualization_data: generateSaliencyMap()
          },
          {
            method: 'feature_importance',
            title: 'Top Influential Features',
            description: 'Features ranked by their contribution to the prediction',
            insights: [
              'The top feature "pixel_314" contributed 0.87 to the decision',
              'The top 3 features account for over 60% of the prediction weight',
              'Many features have minimal impact, indicating good feature selection'
            ],
            top_features: [
              ['pixel_314', 0.87],
              ['pixel_285', 0.79],
              ['pixel_343', 0.72],
              ['pixel_256', 0.65],
              ['pixel_372', 0.58]
            ],
            confidence: 0.88
          },
          {
            method: 'confidence_analysis',
            title: 'Confidence Distribution',
            description: 'Model confidence across all possible classes',
            insights: [
              'The model is highly confident in class "8" (0.983)',
              'The second highest confidence is significantly lower, indicating clear distinction',
              'Low confidence in unrelated classes suggests good model calibration'
            ],
            confidence_scores: {
              '0': 0.012,
              '1': 0.008,
              '2': 0.015,
              '3': 0.021,
              '4': 0.009,
              '5': 0.018,
              '6': 0.011,
              '7': 0.007,
              '8': 0.983,
              '9': 0.016
            },
            confidence: 0.95
          },
          {
            method: 'counterfactuals',
            title: 'What Would Change the Prediction?',
            description: 'Minimal changes that would lead to a different classification',
            insights: [
              'Changing 2 key pixels would likely change the prediction',
              'The model decision is robust to small perturbations in the input',
              'Specific regions of the image are critical for maintaining the current prediction'
            ],
            minimal_changes: 2,
            suggested_modifications: [
              'Add stroke to the top-right corner',
              'Remove connection in the middle section',
              'Extend the bottom line'
            ],
            confidence: 0.85
          }
        ],
        suggestions: [
          'Your model is making well-justified predictions with high confidence!',
          'Consider validating explanations with domain knowledge',
          'Monitor for changes in interpretability over time'
        ],
        recommendations: [
          'Validate explanations with domain knowledge when available',
          'Use multiple interpretability methods for comprehensive understanding',
          'Monitor for changes in interpretability over time',
          'Consider ethical implications of model decisions'
        ],
        encouragement: `Great job on model interpretability, ${predictionData?.student_name || 'Student'}! Understanding model decisions is crucial for responsible AI development.`
      };

      setTimeout(() => {
        setInterpretationReport(mockReport);
        setLoading(false);
      }, 1500);
    };

    generateInterpretation();
  }, [predictionData]);

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.7) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 0.9) return '🟢';
    if (confidence >= 0.7) return '🟡';
    return '🔴';
  };

  // Generate a simple saliency map visualization
  const generateSaliencyMap = () => {
    const map = [];
    for (let i = 0; i < 28; i++) {
      const row = [];
      for (let j = 0; j < 28; j++) {
        // Create a pattern that highlights the center
        const distance = Math.sqrt(Math.pow(i - 14, 2) + Math.pow(j - 14, 2));
        let value = 0;
        if (distance < 8) value = Math.random() * 0.3 + 0.7; // High importance
        else if (distance < 12) value = Math.random() * 0.3 + 0.4; // Medium importance
        else if (distance < 16) value = Math.random() * 0.3 + 0.1; // Low importance
        row.push(value);
      }
      map.push(row);
    }
    return map;
  };

  const renderSaliencyMap = (data) => {
    if (!data) return null;
    
    return (
      <div className="grid grid-cols-28 gap-0 w-56 h-56 mx-auto border border-gray-600">
        {data.map((row, i) =>
          row.map((value, j) => (
            <div
              key={`${i}-${j}`}
              className="w-2 h-2"
              style={{
                backgroundColor: `rgba(255, 0, 0, ${value})`,
                opacity: value
              }}
            />
          ))
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Model Interpretability 🧠
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Understand how your AI model makes decisions. Get visual and textual explanations for predictions.
      </p>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="space-y-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="text-gray-400">Analyzing model decisions...</p>
          </div>
        </div>
      ) : null}

      {!loading && interpretationReport && (
        <>
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('explanations')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'explanations'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Explanations
            </button>
            <button
              onClick={() => setActiveTab('confidence')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'confidence'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Confidence
            </button>
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'suggestions'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Suggestions
            </button>
          </div>

          {/* Explanations Tab */}
          {activeTab === 'explanations' && (
            <div className="space-y-4">
              {interpretationReport.explanations.map((explanation, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-indigo-900 to-purple-900 bg-opacity-40 border border-indigo-700 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-indigo-200">{explanation.title}</h4>
                    <div className="flex items-center space-x-1">
                      <span className={getConfidenceColor(explanation.confidence)}>
                        {getConfidenceIcon(explanation.confidence)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {Math.round(explanation.confidence * 100)}% confidence
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-300 mb-3">
                    {explanation.description}
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {explanation.insights.map((insight, i) => (
                      <div key={i} className="text-sm text-cyan-300">
                        • {insight}
                      </div>
                    ))}
                  </div>

                  {/* Visualization */}
                  {explanation.method === 'saliency_maps' && explanation.visualization_data && (
                    <div className="mt-4">
                      <h5 className="text-sm text-yellow-300 mb-2">Saliency Map</h5>
                      {renderSaliencyMap(explanation.visualization_data)}
                    </div>
                  )}

                  {/* Feature Importance */}
                  {explanation.method === 'feature_importance' && explanation.top_features && (
                    <div className="mt-4">
                      <h5 className="text-sm text-yellow-300 mb-2">Top 5 Features</h5>
                      <div className="space-y-1">
                        {explanation.top_features.map(([feature, importance], i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-300">{feature}</span>
                            <span className="text-green-300">{importance.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Confidence Scores */}
                  {explanation.method === 'confidence_analysis' && explanation.confidence_scores && (
                    <div className="mt-4">
                      <h5 className="text-sm text-yellow-300 mb-2">Confidence by Class</h5>
                      <div className="grid grid-cols-5 gap-1">
                        {Object.entries(explanation.confidence_scores).map(([cls, score]) => (
                          <div key={cls} className="text-center">
                            <div className="text-xs text-gray-400">{cls}</div>
                            <div className="text-sm text-green-300">{score.toFixed(3)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Counterfactuals */}
                  {explanation.method === 'counterfactuals' && explanation.suggested_modifications && (
                    <div className="mt-4">
                      <h5 className="text-sm text-yellow-300 mb-2">Suggested Modifications</h5>
                      <div className="space-y-1">
                        {explanation.suggested_modifications.map((mod, i) => (
                          <div key={i} className="text-sm text-cyan-300">
                            • {mod}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Confidence Tab */}
          {activeTab === 'confidence' && (
            <div className="space-y-6">
              {/* Overall Understanding Score */}
              <div className="p-6 bg-gradient-to-r from-purple-900 to-indigo-900 bg-opacity-40 border border-purple-700 rounded-lg text-center">
                <div className="text-sm text-purple-300 mb-1">Model Understanding Score</div>
                <div className="text-5xl font-bold text-white">{interpretationReport.understanding_score}</div>
                <div className="text-purple-300 text-sm mt-1">Out of 100</div>
              </div>

              {/* Confidence Meter */}
              <div className="p-4 bg-black bg-opacity-40 rounded-lg border border-gray-600">
                <h4 className="font-medium text-cyan-300 mb-3">Prediction Confidence: {interpretationReport.confidence.toFixed(3)}</h4>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="h-4 rounded-full bg-gradient-to-r from-green-500 to-cyan-500"
                    style={{ width: `${interpretationReport.confidence * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Prediction Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
                  <div className="text-sm text-blue-300">Predicted Class</div>
                  <div className="text-2xl font-bold text-white">{interpretationReport.predicted_class}</div>
                </div>
                <div className="p-4 bg-green-900 bg-opacity-40 rounded-lg border border-green-700">
                  <div className="text-sm text-green-300">True Class</div>
                  <div className="text-2xl font-bold text-white">{interpretationReport.true_class}</div>
                </div>
                <div className="p-4 bg-yellow-900 bg-opacity-40 rounded-lg border border-yellow-700">
                  <div className="text-sm text-yellow-300">Model Type</div>
                  <div className="text-lg font-bold text-white">{interpretationReport.model_type}</div>
                </div>
                <div className="p-4 bg-purple-900 bg-opacity-40 rounded-lg border border-purple-700">
                  <div className="text-sm text-purple-300">Dataset Type</div>
                  <div className="text-lg font-bold text-white">{interpretationReport.dataset_type}</div>
                </div>
              </div>
            </div>
          )}

          {/* Suggestions Tab */}
          {activeTab === 'suggestions' && (
            <div className="space-y-6">
              {/* Improvement Suggestions */}
              <div>
                <h4 className="font-semibold text-green-400 mb-3">💡 Improvement Suggestions</h4>
                <div className="space-y-2">
                  {interpretationReport.suggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className="p-3 bg-green-900 bg-opacity-40 rounded-lg border border-green-700"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-200 text-sm">{suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-semibold text-blue-400 mb-3">📚 Best Practices</h4>
                <div className="space-y-2">
                  {interpretationReport.recommendations.map((recommendation, i) => (
                    <div
                      key={i}
                      className="p-3 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-200 text-sm">{recommendation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encouragement */}
              <div className="p-4 bg-gradient-to-r from-pink-900 to-rose-900 bg-opacity-40 border border-pink-700 rounded-lg">
                <div className="text-sm text-pink-300">Personal Encouragement</div>
                <div className="text-white italic">"{interpretationReport.encouragement}"</div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI uses multiple methods to explain model predictions including saliency maps, 
          feature importance, and counterfactual analysis. In the full version, this connects 
          to advanced interpretability algorithms.
        </p>
      </div>
    </div>
  );
};

export default ModelInterpretability;
