/**
 * AetherAI - Ethics Detector Component
 * File: EthicsDetector.jsx
 * Purpose: Detect bias and ethical issues in datasets
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Promote ethical AI by detecting bias in datasets.
 */

import React, { useState } from 'react';

const EthicsDetector = ({ datasetName = 'mnist' }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('report');

  const handleAnalyze = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock report based on dataset
      const mockReport = {
        dataset_name: datasetName,
        analysis_timestamp: new Date().toISOString(),
        total_samples: datasetName.toLowerCase().includes('cifar') ? 60000 : 
                        datasetName.toLowerCase().includes('medical') ? 50000 : 70000,
        target_variable: datasetName.toLowerCase().includes('medical') ? 'diagnosis' : 'digit/object',
        collection_method: datasetName.toLowerCase().includes('web') ? 'Web scraping' : 
                          datasetName.toLowerCase().includes('medical') ? 'Hospital records' : 'Volunteer handwriting',
        overall_risk_level: datasetName.toLowerCase().includes('facial') ? 'Critical' :
                           datasetName.toLowerCase().includes('medical') ? 'High' :
                           datasetName.toLowerCase().includes('cifar') ? 'Medium' : 'Low',
        risk_score: datasetName.toLowerCase().includes('facial') ? 3.8 :
                    datasetName.toLowerCase().includes('medical') ? 3.2 :
                    datasetName.toLowerCase().includes('cifar') ? 2.4 : 1.2,
        ethical_concerns: datasetName.toLowerCase().includes('facial') ? [
          {
            issue: 'Racial/ethnic bias',
            description: 'Facial recognition datasets have historically underrepresented darker skin tones, leading to higher error rates for people of color.',
            risk_level: 'Critical',
            recommendation: 'Use datasets with balanced racial/ethnic representation and test model performance across skin tone categories.'
          },
          {
            issue: 'Gender classification bias',
            description: 'Binary gender classification reinforces gender stereotypes and fails to represent non-binary and transgender individuals.',
            risk_level: 'High',
            recommendation: 'Avoid binary gender classification when possible and use gender-neutral approaches.'
          }
        ] : datasetName.toLowerCase().includes('medical') ? [
          {
            issue: 'Gender imbalance',
            description: 'Medical datasets often overrepresent certain genders, leading to models that perform poorly on underrepresented groups.',
            risk_level: 'High',
            recommendation: 'Analyze gender distribution and apply reweighting or oversampling techniques to mitigate bias.'
          },
          {
            issue: 'Age distribution bias',
            description: 'Many medical datasets focus on adult populations, limiting applicability to pediatric or geriatric care.',
            risk_level: 'High',
            recommendation: 'Collect additional data from underrepresented age groups or use transfer learning from adult to pediatric models.'
          }
        ] : datasetName.toLowerCase().includes('cifar') ? [
          {
            issue: 'Limited geographic representation',
            description: 'CIFAR-10/100 datasets were collected from internet images with potential geographic bias toward Western countries and urban environments.',
            risk_level: 'Medium',
            recommendation: 'Validate model performance across diverse geographic regions and consider collecting supplementary data from underrepresented areas.'
          },
          {
            issue: 'Potential cultural bias',
            description: 'Object categories may reflect cultural bias in what is considered "common" objects, potentially disadvantaging models deployed in different cultural contexts.',
            risk_level: 'Medium',
            recommendation: 'Test model on culturally diverse test sets and consider redefining object categories for specific deployment contexts.'
          }
        ] : [
          {
            issue: 'Lack of demographic diversity',
            description: 'MNIST dataset contains handwritten digits without demographic information, limiting analysis of demographic bias but also preventing detection of representation issues.',
            risk_level: 'Low',
            recommendation: 'Consider augmenting with demographic metadata for real-world applications.'
          }
        ],
        educational_content: {
          title: 'Understanding AI Ethics',
          sections: [
            {
              heading: 'What is Algorithmic Bias?',
              content: 'Algorithmic bias occurs when an AI system produces systematically prejudiced results due to erroneous assumptions in the machine learning process. This can happen at various stages including data collection, feature selection, and model training.'
            },
            {
              heading: 'Common Sources of Bias',
              content: '• Historical bias in training data\n• Representation bias (under/over-representation)\n• Measurement bias (flawed data collection)\n• Aggregation bias (treating diverse groups as homogeneous)\n• Automation bias (over-trusting AI decisions)'
            },
            {
              heading: 'Why Ethics Matter in AI',
              content: 'Unethical AI systems can perpetuate and amplify societal inequalities, leading to unfair outcomes in critical areas like healthcare, finance, and criminal justice. Responsible AI development requires proactive identification and mitigation of ethical risks.'
            }
          ]
        }
      };

      setReport(mockReport);
      setLoading(false);
    }, 1500);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'Critical': return 'from-red-900 to-pink-900';
      case 'High': return 'from-orange-900 to-red-900';
      case 'Medium': return 'from-yellow-900 to-orange-900';
      case 'Low': return 'from-green-900 to-emerald-900';
      default: return 'from-gray-900 to-gray-700';
    }
  };

  const getRiskTextColor = (level) => {
    switch (level) {
      case 'Critical': return 'text-red-200';
      case 'High': return 'text-orange-200';
      case 'Medium': return 'text-yellow-200';
      case 'Low': return 'text-green-200';
      default: return 'text-gray-200';
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        AI Ethics & Bias Detector 🛡️
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Analyze your dataset for potential bias and ethical concerns. Promote responsible AI development.
      </p>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 disabled:from-gray-600 text-black font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition mb-6"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
            Analyzing Ethics...
          </div>
        ) : (
          "🔍 Analyze Dataset Ethics"
        )}
      </button>

      {/* Tabs */}
      {report && (
        <div className="mb-6">
          <div className="flex space-x-1 mb-4">
            <button
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'report'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Report
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'education'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Education
            </button>
          </div>

          {/* Report Tab */}
          {activeTab === 'report' && (
            <div className="space-y-6">
              {/* Risk Level */}
              <div className={`p-4 bg-gradient-to-r ${getRiskColor(report.overall_risk_level)} bg-opacity-60 border border-opacity-50 rounded-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-sm ${getRiskTextColor(report.overall_risk_level)} opacity-80`}>Overall Risk Level</div>
                    <div className={`text-2xl font-bold ${getRiskTextColor(report.overall_risk_level)}`}>
                      {report.overall_risk_level} (Score: {report.risk_score})
                    </div>
                  </div>
                  <div className={`text-4xl ${getRiskTextColor(report.overall_risk_level)}`}>
                    {report.overall_risk_level === 'Critical' ? '⚠️' : 
                     report.overall_risk_level === 'High' ? '🔴' : 
                     report.overall_risk_level === 'Medium' ? '🟠' : '🟢'}
                  </div>
                </div>
              </div>

              {/* Dataset Info */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Dataset', value: report.dataset_name },
                  { label: 'Total Samples', value: report.total_samples.toLocaleString() },
                  { label: 'Target Variable', value: report.target_variable },
                  { label: 'Collection Method', value: report.collection_method }
                ].map((info, i) => (
                  <div key={i} className="p-3 bg-black bg-opacity-40 rounded-lg border border-gray-600">
                    <div className="text-xs text-gray-400 mb-1">{info.label}</div>
                    <div className="text-sm text-white font-medium">{info.value}</div>
                  </div>
                ))}
              </div>

              {/* Ethical Concerns */}
              <div>
                <h4 className="font-semibold text-yellow-400 mb-3">⚠️ Ethical Concerns</h4>
                <div className="space-y-4">
                  {report.ethical_concerns.map((concern, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border ${
                        concern.risk_level === 'Critical'
                          ? 'bg-gradient-to-r from-red-900 to-pink-900 bg-opacity-40 border-red-700'
                          : concern.risk_level === 'High'
                          ? 'bg-gradient-to-r from-orange-900 to-red-900 bg-opacity-40 border-orange-700'
                          : concern.risk_level === 'Medium'
                          ? 'bg-gradient-to-r from-yellow-900 to-orange-900 bg-opacity-40 border-yellow-700'
                          : 'bg-gradient-to-r from-green-900 to-emerald-900 bg-opacity-40 border-green-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-bold text-white">{concern.issue}</div>
                          <div className="text-sm text-gray-300 mt-1">{concern.description}</div>
                        </div>
                        <div className={`ml-4 text-xs px-2 py-1 rounded ${
                          concern.risk_level === 'Critical'
                            ? 'bg-red-800 text-red-200'
                            : concern.risk_level === 'High'
                            ? 'bg-orange-800 text-orange-200'
                            : concern.risk_level === 'Medium'
                            ? 'bg-yellow-800 text-yellow-200'
                            : 'bg-green-800 text-green-200'
                        }`}>
                          {concern.risk_level}
                        </div>
                      </div>
                      <div className="text-sm text-cyan-300 mt-3">
                        <strong>Recommendation:</strong> {concern.recommendation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-cyan-400 text-lg">{report.educational_content.title}</h4>
              
              {report.educational_content.sections.map((section, i) => (
                <div key={i} className="p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
                  <h5 className="font-semibold text-purple-400 mb-2">{section.heading}</h5>
                  <div className="text-gray-300 text-sm whitespace-pre-line">{section.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes your dataset characteristics and identifies potential bias and ethical concerns. 
          In the full version, this connects to a sophisticated ethics detection API.
        </p>
      </div>
    </div>
  );
};

export default EthicsDetector;
