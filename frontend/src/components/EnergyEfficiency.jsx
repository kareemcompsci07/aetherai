/**
 * AetherAI - Energy Efficiency Component
 * File: EnergyEfficiency.jsx
 * Purpose: Show energy consumption and carbon savings analysis
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students understand the environmental impact of AI training.
 */

import React, { useState, useEffect } from 'react';

const EnergyEfficiency = ({ trainingData }) => {
  const [efficiencyReport, setEfficiencyReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('analysis');

  // Simulate API call
  useEffect(() => {
    const generateEfficiencyReport = () => {
      // Mock data based on training data
      const mockReport = {
        analysis_date: new Date().toISOString(),
        training_time_minutes: trainingData?.training_time_minutes || 240,
        model_type: trainingData?.model_type || 'cnn',
        dataset_size: trainingData?.dataset_size || 60000,
        hardware_type: trainingData?.hardware_type || 'cpu',
        hardware_details: trainingData?.hardware_details || 'laptop',
        cloud_simulation: trainingData?.cloud_simulation || false,
        country: trainingData?.country || 'Egypt',
        energy_kwh: 1.44,
        power_watts: 360,
        carbon_emissions_kg: 0.752,
        carbon_factor_g_per_kwh: 520,
        efficiency_score: 78,
        trees_equivalent: 0.038,
        car_miles_equivalent: 1.86,
        comparison: {
          energy_consumption: {
            your_usage: 1.44,
            average_usage: 2.16,
            unit: 'kWh',
            savings: 0.72
          },
          carbon_emissions: {
            your_emissions: 0.752,
            average_emissions: 1.123,
            unit: 'kg CO2',
            savings: 0.371
          },
          training_time: {
            your_time: 240,
            average_time: 360,
            unit: 'minutes',
            savings: 120
          }
        },
        suggestions: [
          'Your training process is highly efficient! Great job on resource optimization.',
          'Consider using cloud GPU instances for faster and potentially more efficient training',
          'Optimize your model architecture to reduce training time'
        ],
        recommendations: [
          'Use early stopping to prevent overtraining',
          'Implement learning rate scheduling for faster convergence',
          'Use smaller batch sizes when possible',
          'Consider using renewable energy sources for computing'
        ],
        encouragement: `Great job on energy efficiency, ${trainingData?.student_name || 'Student'}! You're setting a great example for sustainable AI development.`
      };

      setTimeout(() => {
        setEfficiencyReport(mockReport);
        setLoading(false);
      }, 1500);
    };

    generateEfficiencyReport();
  }, [trainingData]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getIcon = (score) => {
    if (score >= 80) return '🌟';
    if (score >= 60) return '✅';
    return '⚠️';
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Energy Efficiency 🌍
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Analyze the environmental impact of your AI training. Understand energy consumption and carbon emissions.
      </p>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="space-y-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="text-gray-400">Analyzing energy efficiency...</p>
          </div>
        </div>
      ) : null}

      {!loading && efficiencyReport && (
        <>
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'analysis'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Analysis
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'comparison'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Comparison
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

          {/* Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {/* Overall Efficiency Score */}
              <div className="p-6 bg-gradient-to-r from-green-900 to-emerald-900 bg-opacity-40 border border-green-700 rounded-lg text-center">
                <div className="text-sm text-green-300 mb-1">Energy Efficiency Score</div>
                <div className="text-5xl font-bold text-white">{efficiencyReport.efficiency_score}</div>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <span className="text-2xl">{getIcon(efficiencyReport.efficiency_score)}</span>
                  <span className={`text-xl font-semibold ${getScoreColor(efficiencyReport.efficiency_score)}`}>
                    {efficiencyReport.efficiency_score >= 80 ? 'Excellent' : 
                     efficiencyReport.efficiency_score >= 60 ? 'Good' : 'Needs Improvement'}
                  </span>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">⚡</span>
                    <div className="text-sm text-blue-300">Energy Consumption</div>
                  </div>
                  <div className="text-2xl font-bold text-white">{efficiencyReport.energy_kwh} kWh</div>
                </div>
                <div className="p-4 bg-red-900 bg-opacity-40 rounded-lg border border-red-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">🌫️</span>
                    <div className="text-sm text-red-300">Carbon Emissions</div>
                  </div>
                  <div className="text-2xl font-bold text-white">{efficiencyReport.carbon_emissions_kg.toFixed(3)} kg CO₂</div>
                </div>
                <div className="p-4 bg-yellow-900 bg-opacity-40 rounded-lg border border-yellow-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">🌳</span>
                    <div className="text-sm text-yellow-300">Trees Equivalent</div>
                  </div>
                  <div className="text-2xl font-bold text-white">{efficiencyReport.trees_equivalent} trees</div>
                </div>
                <div className="p-4 bg-purple-900 bg-opacity-40 rounded-lg border border-purple-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">🚗</span>
                    <div className="text-sm text-purple-300">Car Miles</div>
                  </div>
                  <div className="text-2xl font-bold text-white">{efficiencyReport.car_miles_equivalent} miles</div>
                </div>
              </div>

              {/* Training Info */}
              <div className="p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
                <h4 className="font-medium text-cyan-300 mb-3">Training Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Model Type</div>
                    <div className="text-white">{efficiencyReport.model_type}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Dataset Size</div>
                    <div className="text-white">{efficiencyReport.dataset_size.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Training Time</div>
                    <div className="text-white">{efficiencyReport.training_time_minutes} minutes</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Hardware</div>
                    <div className="text-white">{efficiencyReport.hardware_details} {efficiencyReport.hardware_type}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Cloud Simulation</div>
                    <div className="text-white">{efficiencyReport.cloud_simulation ? 'Yes' : 'No'}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Country</div>
                    <div className="text-white">{efficiencyReport.country}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              {/* Energy Consumption */}
              <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 bg-opacity-40 border border-blue-700 rounded-lg">
                <h4 className="font-semibold text-blue-200 mb-3">⚡ Energy Consumption</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Your Usage</span>
                  <span className="text-lg font-bold text-white">{efficiencyReport.comparison.energy_consumption.your_usage} kWh</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Average Usage</span>
                  <span className="text-lg font-bold text-white">{efficiencyReport.comparison.energy_consumption.average_usage} kWh</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${(efficiencyReport.comparison.energy_consumption.your_usage / efficiencyReport.comparison.energy_consumption.average_usage) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-green-400">
                  🎉 You saved {efficiencyReport.comparison.energy_consumption.savings} kWh!
                </div>
              </div>

              {/* Carbon Emissions */}
              <div className="p-4 bg-gradient-to-r from-red-900 to-pink-900 bg-opacity-40 border border-red-700 rounded-lg">
                <h4 className="font-semibold text-red-200 mb-3">🌫️ Carbon Emissions</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Your Emissions</span>
                  <span className="text-lg font-bold text-white">{efficiencyReport.comparison.carbon_emissions.your_emissions.toFixed(3)} kg CO₂</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Average Emissions</span>
                  <span className="text-lg font-bold text-white">{efficiencyReport.comparison.carbon_emissions.average_emissions.toFixed(3)} kg CO₂</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${(efficiencyReport.comparison.carbon_emissions.your_emissions / efficiencyReport.comparison.carbon_emissions.average_emissions) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-green-400">
                  🌱 You reduced emissions by {efficiencyReport.comparison.carbon_emissions.savings.toFixed(3)} kg CO₂!
                </div>
              </div>

              {/* Training Time */}
              <div className="p-4 bg-gradient-to-r from-purple-900 to-violet-900 bg-opacity-40 border border-purple-700 rounded-lg">
                <h4 className="font-semibold text-purple-200 mb-3">⏱️ Training Time</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Your Time</span>
                  <span className="text-lg font-bold text-white">{efficiencyReport.comparison.training_time.your_time} minutes</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Average Time</span>
                  <span className="text-lg font-bold text-white">{efficiencyReport.comparison.training_time.average_time} minutes</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${(efficiencyReport.comparison.training_time.your_time / efficiencyReport.comparison.training_time.average_time) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-green-400">
                  ⏩ You trained {efficiencyReport.comparison.training_time.savings} minutes faster!
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
                  {efficiencyReport.suggestions.map((suggestion, i) => (
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
                  {efficiencyReport.recommendations.map((recommendation, i) => (
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
                <div className="text-white italic">"{efficiencyReport.encouragement}"</div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI calculates your energy consumption based on training time, hardware, and location. 
          In the full version, this connects to real-time energy monitoring and carbon accounting systems.
        </p>
      </div>
    </div>
  );
};

export default EnergyEfficiency;
