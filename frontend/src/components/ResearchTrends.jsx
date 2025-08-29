/**
 * AetherAI - Research Trends Component
 * File: ResearchTrends.jsx
 * Purpose: Show emerging AI research areas and future directions
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students discover emerging research areas and contribute to science.
 */

import React, { useState, useEffect } from 'react';

const ResearchTrends = ({ studentProfile }) => {
  const [trendReport, setTrendReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trends');

  // Simulate API call
  useEffect(() => {
    const generateTrends = () => {
      // Mock data based on student profile
      const mockReport = {
        student_id: studentProfile?.student_id || 'std_123',
        analysis_date: new Date().toISOString(),
        current_level: studentProfile?.current_level || 'beginner',
        country: studentProfile?.country || 'Egypt',
        trends: [
          {
            category: 'AI Ethics & Fairness',
            growth_rate: 42.8,
            hot_topics: ['Bias Detection', 'Explainable AI', 'Responsible AI'],
            recommended_datasets: ['FairFace', 'BOLD'],
            urgency: 'High'
          },
          {
            category: 'Computer Vision',
            growth_rate: 23.5,
            hot_topics: ['Vision Transformers', 'Neural Radiance Fields'],
            recommended_datasets: ['CIFAR-100', 'ImageNet'],
            urgency: 'Medium'
          }
        ],
        emerging_areas: [
          {
            area: 'Vision Transformers',
            description: 'Transformers applied to computer vision tasks, achieving state-of-the-art results',
            potential_impact: 'Could revolutionize computer vision applications in healthcare and autonomous systems',
            learning_resources: ['ViT Paper', 'PyTorch Implementation', 'Tutorial on Transfer Learning']
          },
          {
            area: 'Diffusion Models',
            description: 'Generative models that create high-quality images through denoising processes',
            potential_impact: 'Enabling creative applications in art, design, and content creation',
            learning_resources: ['Denoising Diffusion Paper', 'Stable Diffusion Guide', 'GANs vs Diffusion']
          },
          {
            area: 'AI for Climate Science',
            description: 'Using AI to model climate patterns and optimize energy usage',
            potential_impact: 'Helping mitigate climate change through better predictions and optimization',
            learning_resources: ['Climate Modeling Paper', 'Carbon Footprint Analysis', 'Renewable Energy ML']
          }
        ],
        personalized_suggestions: [
          'Consider exploring Vision Transformers for image classification tasks',
          'Bias detection in facial recognition systems is a critical research area',
          'You\'re ready for research-level projects. Consider publishing your work!'
        ],
        next_steps: [
          'Explore research papers on arXiv related to your suggested areas',
          'Join AI research communities and forums',
          'Consider collaborating with peers on research projects',
          'Document your research journey in a portfolio'
        ],
        encouragement: `Keep exploring, ${studentProfile?.name || 'Student'}! The future of AI needs diverse perspectives from countries like ${studentProfile?.country || 'your country'}.`
      };

      setTimeout(() => {
        setTrendReport(mockReport);
        setLoading(false);
      }, 1500);
    };

    generateTrends();
  }, [studentProfile]);

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'bg-red-900 bg-opacity-40 border-red-700 text-red-200';
      case 'Medium': return 'bg-yellow-900 bg-opacity-40 border-yellow-700 text-yellow-200';
      default: return 'bg-green-900 bg-opacity-40 border-green-700 text-green-200';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'High': return '🔴';
      case 'Medium': return '🟡';
      default: '🟢';
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Research Trends 🔍
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Discover emerging AI research areas and future directions. Stay ahead of the curve with personalized suggestions.
      </p>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="space-y-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="text-gray-400">Analyzing research trends...</p>
          </div>
        </div>
      ) : null}

      {!loading && trendReport && (
        <>
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('trends')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'trends'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Trends
            </button>
            <button
              onClick={() => setActiveTab('emerging')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'emerging'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Emerging Areas
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

          {/* Trends Tab */}
          {activeTab === 'trends' && (
            <div className="space-y-4">
              {trendReport.trends.map((trend, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${getUrgencyColor(trend.urgency)}`}
                  style={{ borderLeftWidth: '6px' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getUrgencyIcon(trend.urgency)}</span>
                      <h4 className="font-semibold">{trend.category}</h4>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      trend.urgency === 'High' ? 'bg-red-800' :
                      trend.urgency === 'Medium' ? 'bg-yellow-800' :
                      'bg-green-800'
                    }`}>
                      {trend.urgency}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-400">Growth Rate</div>
                      <div className="text-xl font-bold text-white">{trend.growth_rate}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Hot Topics</div>
                      <div className="text-sm text-cyan-300">
                        {trend.hot_topics.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Recommended Datasets</div>
                    <div className="text-sm text-yellow-300">
                      {trend.recommended_datasets.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Emerging Areas Tab */}
          {activeTab === 'emerging' && (
            <div className="space-y-4">
              {trendReport.emerging_areas.map((area, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-indigo-900 to-purple-900 bg-opacity-40 border border-indigo-700 rounded-lg"
                >
                  <h4 className="font-semibold text-indigo-200 mb-2">{area.area}</h4>
                  
                  <div className="text-sm text-gray-300 mb-3">
                    <strong>Description:</strong> {area.description}
                  </div>
                  
                  <div className="text-sm text-gray-300 mb-3">
                    <strong>Potential Impact:</strong> {area.potential_impact}
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Learning Resources</div>
                    <div className="text-sm text-cyan-300">
                      {area.learning_resources.join(' • ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions Tab */}
          {activeTab === 'suggestions' && (
            <div className="space-y-6">
              {/* Personalized Suggestions */}
              <div>
                <h4 className="font-semibold text-green-400 mb-3">💡 Personalized Suggestions</h4>
                <div className="space-y-2">
                  {trendReport.personalized_suggestions.map((suggestion, i) => (
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

              {/* Next Steps */}
              <div>
                <h4 className="font-semibold text-blue-400 mb-3">🚀 Next Steps</h4>
                <div className="space-y-2">
                  {trendReport.next_steps.map((step, i) => (
                    <div
                      key={i}
                      className="p-3 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-200 text-sm">{step}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encouragement */}
              <div className="p-4 bg-gradient-to-r from-pink-900 to-rose-900 bg-opacity-40 border border-pink-700 rounded-lg">
                <div className="text-sm text-pink-300">Personal Encouragement</div>
                <div className="text-white italic">"{trendReport.encouragement}"</div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes current research papers and trends to suggest emerging areas. 
          In the full version, this connects to a machine learning model that predicts future research directions.
        </p>
      </div>
    </div>
  );
};

export default ResearchTrends;
