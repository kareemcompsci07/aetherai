/**
 * AetherAI - Learning Path Generator Component
 * File: LearningPathGenerator.jsx
 * Purpose: Generate personalized learning paths for students
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help every student find their unique path in AI.
 */

import React, { useState, useEffect } from 'react';

const LearningPathGenerator = ({ studentProfile }) => {
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulate API call
  useEffect(() => {
    const generatePath = () => {
      // Mock data based on student profile
      const mockPath = {
        student_id: studentProfile?.student_id || 'student_123',
        generated_date: new Date().toISOString(),
        current_level: studentProfile?.current_level || 'beginner',
        recommended_level: 
          (studentProfile?.best_accuracy || 0) >= 0.98 ? 'advanced' :
          (studentProfile?.best_accuracy || 0) >= 0.95 ? 'intermediate' : 'beginner',
        career_track: studentProfile?.goals?.some(g => g.toLowerCase().includes('research')) ? 
                      'AI Research Scientist' : 
                      studentProfile?.goals?.some(g => g.toLowerCase().includes('ethics')) ?
                      'AI Ethics Specialist' : 'Machine Learning Engineer',
        path_duration_weeks: 
          (studentProfile?.best_accuracy || 0) >= 0.98 ? 16 : 
          (studentProfile?.best_accuracy || 0) >= 0.95 ? 12 : 8,
        path_description: 
          (studentProfile?.best_accuracy || 0) >= 0.98 ? 
          'Dive into advanced research topics and original AI contributions.' :
          (studentProfile?.best_accuracy || 0) >= 0.95 ?
          'Master deep learning techniques and advanced neural network architectures.' :
          'Build a strong foundation in AI and machine learning fundamentals.',
        milestones: [
          'Complete first AI experiment',
          'Achieve 90%+ accuracy on MNIST',
          'Understand neural network basics',
          'Join the learning community'
        ],
        recommended_projects: [
          'MNIST Digit Classification',
          'CIFAR-10 Image Recognition',
          'Basic Neural Network from Scratch'
        ],
        skills_to_develop: [
          'Python programming',
          'Neural network fundamentals',
          'Data preprocessing',
          'Model evaluation'
        ],
        weekly_plan: Array.from({ length: 8 }, (_, i) => ({
          week: i + 1,
          topic: [
            'Neural Network Fundamentals', 
            'Data Preprocessing', 
            'Model Training', 
            'Evaluation Metrics',
            'Regularization Techniques',
            'Hyperparameter Tuning',
            'CNN Architectures',
            'Transfer Learning'
          ][i % 8],
          activity: [
            'Complete tutorial on Neural Networks',
            'Run experiment with data augmentation',
            'Analyze training curves',
            'Compare different models',
            'Implement dropout regularization',
            'Tune learning rate and batch size',
            'Build CNN for image classification',
            'Use pretrained models for transfer learning'
          ][i % 8],
          expected_outcome: [
            'Understand forward and backward propagation',
            'Preprocess data for optimal training',
            'Train your first neural network',
            'Evaluate model performance metrics',
            'Reduce overfitting with regularization',
            'Optimize hyperparameters for better results',
            'Implement convolutional layers',
            'Apply transfer learning to new datasets'
          ][i % 8]
        })),
        recommendations: [
          'Continue building your portfolio of experiments',
          'Engage with the global learning community',
          'Focus on projects that interest you most',
          'Document your learning journey',
          'Set specific goals for next month'
        ],
        next_steps: [
          'Start project: MNIST Digit Classification',
          'Complete AI for Beginners course',
          'Join study group for peer learning',
          'Set accuracy goal of 95%+'
        ]
      };

      // Update for intermediate/advanced levels
      if (mockPath.recommended_level === 'intermediate') {
        mockPath.milestones = [
          'Implement CNN architectures',
          'Experiment with hyperparameter tuning',
          'Achieve 95%+ accuracy on MNIST',
          'Publish research on social feed'
        ];
        mockPath.recommended_projects = [
          'Advanced CNN for CIFAR-10',
          'Transfer Learning with Pretrained Models',
          'Hyperparameter Optimization Study'
        ];
        mockPath.skills_to_develop = [
          'Convolutional Neural Networks',
          'Hyperparameter tuning',
          'Regularization techniques',
          'Model evaluation'
        ];
        mockPath.path_duration_weeks = 12;
      } else if (mockPath.recommended_level === 'advanced') {
        mockPath.milestones = [
          'Publish research paper',
          'Achieve state-of-the-art results',
          'Present findings to global community',
          'Mentor other students'
        ];
        mockPath.recommended_projects = [
          'Original Research on Dataset Bias',
          'Novel Architecture Design',
          'Ethical AI Implementation'
        ];
        mockPath.skills_to_develop = [
          'Research methodology',
          'Academic writing',
          'Innovative thinking',
          'Scientific communication'
        ];
        mockPath.path_duration_weeks = 16;
      }

      setTimeout(() => {
        setPath(mockPath);
        setLoading(false);
      }, 1500);
    };

    generatePath();
  }, [studentProfile]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'from-blue-900 to-cyan-900';
      case 'intermediate': return 'from-green-900 to-emerald-900';
      case 'advanced': return 'from-purple-900 to-pink-900';
      default: return 'from-gray-900 to-gray-700';
    }
  };

  const getLevelTextColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-blue-200';
      case 'intermediate': return 'text-green-200';
      case 'advanced': return 'text-purple-200';
      default: return 'text-gray-200';
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Learning Path Generator 🗺️
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Get a personalized learning path based on your progress and goals. Your unique journey in AI starts here.
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

      {!loading && path && (
        <>
          {/* Level Indicator */}
          <div className={`p-4 mb-6 bg-gradient-to-r ${getLevelColor(path.recommended_level)} bg-opacity-60 border border-opacity-50 rounded-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-sm ${getLevelTextColor(path.recommended_level)} opacity-80`}>Recommended Level</div>
                <div className={`text-2xl font-bold ${getLevelTextColor(path.recommended_level)}`}>
                  {path.recommended_level.charAt(0).toUpperCase() + path.recommended_level.slice(1)}
                </div>
              </div>
              <div className={`text-4xl ${getLevelTextColor(path.recommended_level)}`}>
                {path.recommended_level === 'beginner' ? '🌱' : 
                 path.recommended_level === 'intermediate' ? '🚀' : '🌟'}
              </div>
            </div>
          </div>

          {/* Career Track */}
          <div className="p-4 mb-6 bg-gradient-to-r from-indigo-900 to-purple-900 bg-opacity-40 border border-indigo-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.6-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
              </svg>
              <span className="font-semibold text-indigo-200">Career Track</span>
            </div>
            <div className="text-white font-medium">{path.career_track}</div>
            <div className="text-indigo-300 text-sm mt-1">{path.path_description}</div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex space-x-1 mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 font-medium rounded-lg transition ${
                  activeTab === 'overview'
                    ? 'bg-cyan-400 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('weekly')}
                className={`px-4 py-2 font-medium rounded-lg transition ${
                  activeTab === 'weekly'
                    ? 'bg-cyan-400 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Weekly Plan
              </button>
              <button
                onClick={() => setActiveTab('recommendations')}
                className={`px-4 py-2 font-medium rounded-lg transition ${
                  activeTab === 'recommendations'
                    ? 'bg-cyan-400 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Recommendations
              </button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Duration */}
                <div className="p-4 bg-black bg-opacity-40 rounded-lg border border-gray-600">
                  <div className="text-xs text-gray-400 mb-1">Duration</div>
                  <div className="text-lg text-white font-medium">{path.path_duration_weeks} weeks</div>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-3">🎯 Key Milestones</h4>
                  <div className="space-y-2">
                    {path.milestones.map((milestone, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-200 text-sm">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Projects */}
                <div>
                  <h4 className="font-semibold text-green-400 mb-3">🔧 Recommended Projects</h4>
                  <div className="space-y-2">
                    {path.recommended_projects.map((project, i) => (
                      <div key={i} className="p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-200">{project}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills to Develop */}
                <div>
                  <h4 className="font-semibold text-blue-400 mb-3">🧠 Skills to Develop</h4>
                  <div className="flex flex-wrap gap-2">
                    {path.skills_to_develop.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-900 bg-opacity-40 text-blue-200 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Weekly Plan Tab */}
            {activeTab === 'weekly' && (
              <div className="space-y-3">
                {path.weekly_plan.map((week) => (
                  <div
                    key={week.week}
                    className="p-4 bg-black bg-opacity-40 rounded-lg border border-gray-600 hover:bg-opacity-60 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-cyan-400">Week {week.week}</div>
                      <div className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        {week.topic}
                      </div>
                    </div>
                    <div className="text-gray-200 mb-2">{week.activity}</div>
                    <div className="text-sm text-gray-400 italic">→ {week.expected_outcome}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-3">💡 Personal Recommendations</h4>
                  <div className="space-y-3">
                    {path.recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="p-3 bg-gradient-to-r from-purple-900 to-pink-900 bg-opacity-40 border border-purple-700 rounded-lg"
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-200 text-sm">{rec}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-400 mb-3">🚀 Next Steps</h4>
                  <div className="space-y-2">
                    {path.next_steps.map((step, i) => (
                      <div
                        key={i}
                        className="p-3 bg-gradient-to-r from-green-900 to-emerald-900 bg-opacity-40 border border-green-700 rounded-lg"
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-200 text-sm">{step}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes your progress, accuracy, and goals to recommend a personalized 
          learning path. In the full version, this connects to an AI-powered recommendation engine.
        </p>
      </div>
    </div>
  );
};

export default LearningPathGenerator;
