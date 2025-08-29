/**
 * AetherAI - Dataset Quality Component
 * File: DatasetQuality.jsx
 * Purpose: Show dataset quality analysis and improvement suggestions
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students identify and fix dataset issues before training.
 */

import React, { useState, useEffect } from 'react';

const DatasetQuality = ({ datasetInfo }) => {
  const [qualityReport, setQualityReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('score');

  // Simulate API call
  useEffect(() => {
    const generateQualityReport = () => {
      // Mock data based on dataset info
      const mockReport = {
        dataset_name: datasetInfo?.name || 'MNIST Classification',
        analysis_date: new Date().toISOString(),
        model_type: datasetInfo?.model_type || 'cnn',
        sample_count: datasetInfo?.sample_count || 60000,
        feature_count: datasetInfo?.feature_count || 784,
        total_score: 92.3,
        overall_rating: 'Excellent',
        overall_icon: '🌟',
        confidence_meter: '🌕🌕🌕🌕🌕',
        metrics: {
          balance: {
            score: 0.85,
            rating: 'Excellent',
            value: '0.85',
            details: 'Balanced class distribution across all digits'
          },
          cleanliness: {
            score: 0.98,
            rating: 'Excellent',
            value: '0.98',
            details: 'Minimal missing values and duplicates detected'
          },
          diversity: {
            score: 0.75,
            rating: 'Good',
            value: '0.75',
            details: 'Good variety in handwritten digit samples'
          },
          relevance: {
            score: 0.92,
            rating: 'Excellent',
            value: '0.92',
            details: 'Pixel features highly relevant to digit classification'
          },
          size: {
            score: 1.0,
            rating: 'Excellent',
            value: '60000/5000',
            details: 'More than adequate samples for CNN training'
          }
        },
        suggestions: [
          'Your dataset is in excellent condition! Ready for training.',
          'Consider data augmentation to further improve diversity',
          'Validate model performance on unseen data to ensure generalization'
        ],
        recommendations: [
          'Visualize data distributions to identify potential issues',
          'Use cross-validation to assess model performance robustness',
          'Consider data augmentation techniques to improve diversity',
          'Validate findings with domain experts if available'
        ],
        encouragement: `Great job on data preparation, ${datasetInfo?.student_name || 'Student'}! High-quality data is the foundation of successful AI models.`
      };

      setTimeout(() => {
        setQualityReport(mockReport);
        setLoading(false);
      }, 1500);
    };

    generateQualityReport();
  }, [datasetInfo]);

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'Excellent': return 'text-green-400';
      case 'Good': return 'text-yellow-400';
      case 'Fair': return 'text-orange-400';
      case 'Poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getIcon = (rating) => {
    switch (rating) {
      case 'Excellent': return '🌟';
      case 'Good': return '✅';
      case 'Fair': return '⚠️';
      case 'Poor': return '❌';
      default: '⚪';
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Dataset Quality 📊
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Analyze your dataset quality before training. Get a comprehensive score and improvement suggestions.
      </p>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="space-y-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="text-gray-400">Analyzing dataset quality...</p>
          </div>
        </div>
      ) : null}

      {!loading && qualityReport && (
        <>
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('score')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'score'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Score ({qualityReport.total_score}/100)
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'metrics'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Metrics
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

          {/* Score Tab */}
          {activeTab === 'score' && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="p-6 bg-gradient-to-r from-purple-900 to-indigo-900 bg-opacity-40 border border-purple-700 rounded-lg text-center">
                <div className="text-sm text-purple-300 mb-1">Overall Quality Score</div>
                <div className="text-5xl font-bold text-white">{qualityReport.total_score}</div>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="text-2xl">{qualityReport.overall_icon}</span>
                  <span className={`text-xl font-semibold ${getRatingColor(qualityReport.overall_rating)}`}>
                    {qualityReport.overall_rating}
                  </span>
                </div>
                <div className="text-purple-300 text-sm mt-1">{qualityReport.confidence_meter}</div>
              </div>

              {/* Dataset Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
                  <div className="text-sm text-blue-300">Dataset</div>
                  <div className="text-lg font-bold text-white">{qualityReport.dataset_name}</div>
                </div>
                <div className="p-4 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
                  <div className="text-sm text-blue-300">Model Type</div>
                  <div className="text-lg font-bold text-white">{qualityReport.model_type}</div>
                </div>
                <div className="p-4 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
                  <div className="text-sm text-blue-300">Samples</div>
                  <div className="text-lg font-bold text-white">{qualityReport.sample_count.toLocaleString()}</div>
                </div>
                <div className="p-4 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
                  <div className="text-sm text-blue-300">Features</div>
                  <div className="text-lg font-bold text-white">{qualityReport.feature_count}</div>
                </div>
              </div>
            </div>
          )}

          {/* Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              {Object.entries(qualityReport.metrics).map(([metric, data]) => (
                <div
                  key={metric}
                  className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 bg-opacity-40 border border-gray-600 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-200 capitalize">
                        {metric.replace('_', ' ')}
                      </h4>
                      <div className="text-sm text-gray-400">{data.details}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${getRatingColor(data.rating)}`}>
                        {getIcon(data.rating)}
                      </div>
                      <div className="text-sm text-gray-300">{data.value}</div>
                    </div>
                  </div>
                  
                  {/* Score bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        data.score >= 0.8 ? 'bg-green-500' :
                        data.score >= 0.6 ? 'bg-yellow-500' :
                        data.score >= 0.4 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${data.score * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions Tab */}
          {activeTab === 'suggestions' && (
            <div className="space-y-6">
              {/* Improvement Suggestions */}
              <div>
                <h4 className="font-semibold text-green-400 mb-3">💡 Improvement Suggestions</h4>
                <div className="space-y-2">
                  {qualityReport.suggestions.map((suggestion, i) => (
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
                  {qualityReport.recommendations.map((recommendation, i) => (
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
                <div className="text-white italic">"{qualityReport.encouragement}"</div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes your dataset for balance, cleanliness, diversity, relevance, and size. 
          In the full version, this connects to a machine learning model that predicts dataset quality.
        </p>
      </div>
    </div>
  );
};

export default DatasetQuality;
