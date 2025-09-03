/**
 * AetherAI - Teacher Alerts Component
 * File: TeacherAlerts.jsx
 * Purpose: Show alerts for teachers when students need intervention
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help teachers identify and support struggling students.
 */

import React, { useState, useEffect } from 'react';

const TeacherAlerts = ({ classroom }) => {
  const [alertReport, setAlertReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary');

  // Simulate API call
  useEffect(() => {
    const generateAlertReport = () => {
      // Mock data based on classroom
      const mockReport = {
        summary: {
          class_id: classroom?.class_id || 'cls_101',
          teacher_id: classroom?.teacher_id || 'tch_001',
          total_students: classroom?.students?.length || 30,
          students_with_alerts: classroom?.students?.filter(s => s.improvement_rate < 0.05).length || 2,
          high_severity_alerts: classroom?.students?.filter(s => s.activity_level < 0.3).length || 1,
          medium_severity_alerts: classroom?.students?.filter(s => s.collaboration_score < 0.5 && s.improvement_rate >= 0.05).length || 1,
          summary_date: new Date().toISOString(),
          urgency_level: 'Urgent'
        },
        alerts: classroom?.students?.map(student => {
          const conditions = [];
          const improvementRate = student.improvement_rate || 0;
          const activityLevel = student.activity_level || 0;
          const collaborationScore = student.collaboration_score || 0;

          if (activityLevel < 0.3) {
            conditions.push({
              type: 'low_activity',
              current_value: activityLevel.toFixed(2),
              threshold: 0.3,
              details: `Low activity level (${activityLevel.toFixed(2)} < 0.3)`
            });
          }

          if (improvementRate < 0.03) {
            conditions.push({
              type: 'slow_progress',
              current_value: improvementRate.toFixed(3),
              threshold: 0.03,
              details: `Slow improvement rate (${improvementRate.toFixed(3)} < 0.03)`
            });
          }

          if (collaborationScore < 0.4) {
            conditions.push({
              type: 'low_collaboration',
              current_value: collaborationScore.toFixed(2),
              threshold: 0.4,
              details: `Low collaboration score (${collaborationScore.toFixed(2)} < 0.4)`
            });
          }

          return {
            student_id: student.student_id,
            name: student.name,
            class_id: classroom?.class_id || 'cls_101',
            teacher_id: classroom?.teacher_id || 'tch_001',
            alert_date: new Date().toISOString(),
            severity: conditions.length > 1 ? 'high' : 'medium',
            conditions: conditions,
            recommended_strategies: [
              {
                name: 'Personal Check-in',
                description: 'Have a one-on-one conversation with the student',
                effectiveness: 0.85,
                time_required: '10-15 minutes'
              },
              {
                name: 'Additional Resources',
                description: 'Provide targeted learning materials',
                effectiveness: 0.72,
                time_required: '15 minutes'
              }
            ],
            confidence: 0.85,
            impact_prediction: conditions.length > 1 ? 'High' : 'Medium'
          };
        }).filter(alert => alert.conditions.length > 0) || [],
        suggestions: [
          'Address high-severity alerts immediately as they indicate critical student needs',
          'Plan interventions for medium-severity alerts within the next week'
        ],
        recommendations: [
          'Prioritize interventions based on alert severity',
          'Document interventions and their outcomes',
          'Follow up with students after interventions',
          'Share best practices with other teachers'
        ],
        encouragement: `Great job monitoring your students, ${classroom?.teacher_name || 'Teacher'}! Your attention to individual needs makes a significant difference in their learning journey.`
      };

      setTimeout(() => {
        setAlertReport(mockReport);
        setLoading(false);
      }, 1500);
    };

    generateAlertReport();
  }, [classroom]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      default: 'text-gray-400';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '🟡';
      default: '⚪';
    }
  };

  const getConditionIcon = (type) => {
    switch (type) {
      case 'low_activity': return '⚠️';
      case 'slow_progress': return '🐢';
      case 'low_collaboration': return '👥';
      case 'technical_difficulty': return '💻';
      case 'conceptual_misunderstanding': return '🧠';
      default: 'ℹ️';
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Teacher Alerts 🔔
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Get intelligent alerts when students need intervention, with recommended strategies.
      </p>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="space-y-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="text-gray-400">Analyzing classroom performance...</p>
          </div>
        </div>
      ) : null}

      {!loading && alertReport && (
        <>
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'summary'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Summary
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'alerts'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Alerts ({alertReport.alerts.length})
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

          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Classroom Overview */}
              <div className="p-6 bg-gradient-to-r from-purple-900 to-indigo-900 bg-opacity-40 border border-purple-700 rounded-lg">
                <div className="text-sm text-purple-300 mb-4">Classroom Summary</div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-900 bg-opacity-40 rounded-lg border border-blue-700">
                    <div className="text-sm text-blue-300">Total Students</div>
                    <div className="text-2xl font-bold text-white">{alertReport.summary.total_students}</div>
                  </div>
                  <div className="p-3 bg-green-900 bg-opacity-40 rounded-lg border border-green-700">
                    <div className="text-sm text-green-300">With Alerts</div>
                    <div className="text-2xl font-bold text-white">{alertReport.summary.students_with_alerts}</div>
                  </div>
                  <div className="p-3 bg-orange-900 bg-opacity-40 rounded-lg border border-orange-700">
                    <div className="text-sm text-orange-300">High Severity</div>
                    <div className="text-2xl font-bold text-white">{alertReport.summary.high_severity_alerts}</div>
                  </div>
                  <div className="p-3 bg-yellow-900 bg-opacity-40 rounded-lg border border-yellow-700">
                    <div className="text-sm text-yellow-300">Medium Severity</div>
                    <div className="text-2xl font-bold text-white">{alertReport.summary.medium_severity_alerts}</div>
                  </div>
                </div>
              </div>

              {/* Urgency Level */}
              <div className="p-4 bg-black bg-opacity-40 rounded-lg border border-gray-600">
                <h4 className="font-medium text-cyan-300 mb-2">Urgency Level</h4>
                <div className={`text-xl font-bold ${alertReport.summary.urgency_level === 'Critical' ? 'text-red-400' : alertReport.summary.urgency_level === 'Urgent' ? 'text-orange-400' : 'text-green-400'}`}>
                  {getSeverityIcon(alertReport.summary.urgency_level.toLowerCase())} {alertReport.summary.urgency_level}
                </div>
              </div>
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {alertReport.alerts.map((alert, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 bg-opacity-40 border border-gray-600 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-200">{alert.name}</h4>
                      <div className="text-sm text-gray-400">Student ID: {alert.student_id}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${getSeverityColor(alert.severity)}`}>
                        {getSeverityIcon(alert.severity)} {alert.severity.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-400">Confidence: {(alert.confidence * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                  
                  {/* Conditions */}
                  <div className="mb-3">
                    <h5 className="text-sm text-yellow-300 mb-2">⚠️ Alert Conditions</h5>
                    <div className="space-y-1">
                      {alert.conditions.map((condition, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <span className="w-4 mr-2">{getConditionIcon(condition.type)}</span>
                          <span className="text-cyan-300">{condition.details}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Strategies */}
                  <div>
                    <h5 className="text-sm text-green-300 mb-2">✅ Recommended Strategies</h5>
                    <div className="space-y-1">
                      {alert.recommended_strategies.map((strategy, i) => (
                        <div key={i} className="text-sm text-gray-200">
                          • <span className="font-medium">{strategy.name}</span>: {strategy.description} 
                          <span className="text-xs text-gray-400"> ({strategy.time_required})</span>
                        </div>
                      ))}
                    </div>
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
                  {alertReport.suggestions.map((suggestion, i) => (
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
                  {alertReport.recommendations.map((recommendation, i) => (
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
                <div className="text-white italic">"{alertReport.encouragement}"</div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes student performance, engagement, and collaboration to identify those needing support. 
          In the full version, this connects to real-time classroom analytics and machine learning models.
        </p>
      </div>
    </div>
  );
};

export default TeacherAlerts;
