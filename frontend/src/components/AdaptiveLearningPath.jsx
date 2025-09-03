/**
 * AetherAI - Adaptive Learning Path Component
 * File: AdaptiveLearningPath.jsx
 * Purpose: Show personalized learning path based on student progress and interests
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students follow the optimal path in their AI learning journey.
 */

import React, { useState, useEffect } from 'react';

const AdaptiveLearningPath = ({ studentProfile }) => {
  const [learningPath, setLearningPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('path');

  // Simulate API call
  useEffect(() => {
    const generateLearningPath = () => {
      // Mock data based on student profile
      const mockPath = {
        student_id: studentProfile?.student_id || 'std_123',
        name: studentProfile?.name || 'Kareem Mostafa',
        generation_date: new Date().toISOString(),
        current_level: studentProfile?.current_level || 'intermediate',
        current_stage: 'Intermediate',
        progress_percentage: 85,
        next_stage: 'Advanced',
        focus_area: 'Core Concepts',
        career_path: 'Research Scientist',
        recommended_resources: [
          {
            title: 'Deep Learning Specialization',
            type: 'course',
            difficulty: 'intermediate',
            duration: '12 weeks',
            platform: 'Coursera'
          },
          {
            title: 'Hands-On Machine Learning',
            type: 'book',
            difficulty: 'intermediate',
            duration: '10 weeks',
            platform: 'O\'Reilly'
          },
          {
            title: 'PyTorch Tutorials',
            type: 'tutorial',
            difficulty: 'intermediate',
            duration: '6 weeks',
            platform: 'PyTorch.org'
          }
        ],
        timeline: {
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
          duration_weeks: 12
        },
        milestones: [
          'Complete 3 recommended resources',
          'Build 2 more AI projects',
          'Collaborate with 3 classmates',
          'Achieve 90%+ accuracy on a challenging dataset'
        ],
        suggestions: [
          'You\'re doing great! Keep following your learning path.',
          'Complete more AI projects to build practical experience',
          'Collaborate with classmates to improve teamwork skills'
        ],
        recommendations: [
          'Set specific weekly goals for your learning',
          'Join AI communities to connect with peers',
          'Teach concepts to others to reinforce your understanding',
          'Apply AI to real-world problems that interest you'
        ],
        encouragement: `Amazing progress, ${studentProfile?.name || 'Student'}! You're on an excellent path to becoming an AI expert.`
      };

      setTimeout(() => {
        setLearningPath(mockPath);
        setLoading(false);
      }, 1500);
    };

    generateLearningPath();
  }, [studentProfile]);

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStageIcon = (stage) => {
    switch (stage) {
      case 'Beginner': return '🌱';
      case 'Intermediate': return '🚀';
      case 'Advanced': return '🧠';
      case 'Expert': return '🌟';
      default: '👤';
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Adaptive Learning Path 🎯
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Get a personalized learning journey based on your progress, interests, and goals.
      </p>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="space-y-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="text-gray-400">Generating your learning path...</p>
          </div>
        </div>
      ) : null}

      {!loading && learningPath && (
        <>
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('path')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'path'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Learning Path
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'resources'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Resources
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

          {/* Learning Path Tab */}
          {activeTab === 'path' && (
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="p-6 bg-gradient-to-r from-purple-900 to-indigo-900 bg-opacity-40 border border-purple-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-purple-300 mb-1">Current Level</div>
                    <div className="text-xl font-bold text-white">{learningPath.current_stage}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-purple-300 mb-1">Progress</div>
                    <div className="text-2xl font-bold text-white">{learningPath.progress_percentage}%</div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${getProgressColor(learningPath.progress_percentage)}`}
                    style={{ width: `${learningPath.progress_percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Journey Timeline */}
              <div className="p-4 bg-black bg-opacity-40 rounded-lg border border-gray-600">
                <h4 className="font-medium text-cyan-300 mb-3">Your Learning Journey</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-200">Current: {learningPath.current_stage}</div>
                      <div className="text-xs text-gray-400">Focus: {learningPath.focus_area}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-semibold text-gray-200">Next: {learningPath.next_stage}</div>
                      <div className="text-xs text-gray-400">Target: {learningPath.career_path}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
                <h4 className="font-medium text-yellow-300 mb-2">Timeline</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Start Date</div>
                    <div className="text-white">{new Date(learningPath.timeline.start_date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">End Date</div>
                    <div className="text-white">{new Date(learningPath.timeline.end_date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Duration</div>
                    <div className="text-white">{learningPath.timeline.duration_weeks} weeks</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Career Goal</div>
                    <div className="text-white">{learningPath.career_path}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-4">
              {learningPath.recommended_resources.map((resource, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 bg-opacity-40 border border-gray-600 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-200">{resource.title}</h4>
                      <div className="text-sm text-gray-400">
                        {resource.type} • {resource.difficulty} • {resource.duration}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs bg-cyan-400 text-black px-2 py-1 rounded">
                        {resource.platform}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-300">
                    <span>🎯 Recommended for your career path</span>
                    <span>•</span>
                    <span>📘 {resource.type === 'book' ? 'Read' : resource.type === 'course' ? 'Complete' : 'Follow'} this resource</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions Tab */}
          {activeTab === 'suggestions' && (
            <div className="space-y-6">
              {/* Milestones */}
              <div>
                <h4 className="font-semibold text-green-400 mb-3">🎯 Key Milestones</h4>
                <div className="space-y-2">
                  {learningPath.milestones.map((milestone, i) => (
                    <div
                      key={i}
                      className="p-3 bg-green-900 bg-opacity-40 rounded-lg border border-green-700"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-200 text-sm">{milestone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div>
                <h4 className="font-semibold text-blue-400 mb-3">💡 Improvement Suggestions</h4>
                <div className="space-y-2">
                  {learningPath.suggestions.map((suggestion, i) => (
                    <div
                      key={i}
                      className="p-3 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-200 text-sm">{suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="font-semibold text-purple-400 mb-3">📚 Best Practices</h4>
                <div className="space-y-2">
                  {learningPath.recommendations.map((recommendation, i) => (
                    <div
                      key={i}
                      className="p-3 bg-purple-900 bg-opacity-40 rounded-lg border border-purple-700"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-200 text-sm">{recommendation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Encouragement */}
              <div className="p-4 bg-gradient-to-r from-pink-900 to-rose-900 bg-opacity-40 border border-pink-700 rounded-lg">
                <div className="text-sm text-pink-300">Personal Encouragement</div>
                <div className="text-white italic">"{learningPath.encouragement}"</div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes your progress, interests, and goals to create a personalized learning path. 
          In the full version, this connects to a machine learning model that optimizes your educational journey.
        </p>
      </div>
    </div>
  );
};

export default AdaptiveLearningPath;
