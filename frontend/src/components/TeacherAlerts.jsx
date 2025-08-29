/**
 * AetherAI - Teacher Alerts Component
 * File: TeacherAlerts.jsx
 * Purpose: Show intelligent alerts for teachers about student progress
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help teachers identify and support struggling students.
 */

import React, { useState, useEffect } from 'react';

const TeacherAlerts = ({ classroom }) => {
  const [alerts, setAlerts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('alerts');

  // Simulate API call
  useEffect(() => {
    const generateAlerts = () => {
      // Mock data based on classroom
      const mockAlerts = {
        class_id: classroom?.class_id || 'cls_101',
        teacher_id: classroom?.teacher_id || 'tch_001',
        total_alerts: 3,
        alerts: [
          {
            alert_id: 'alert_001',
            student_id: 'std_002',
            student_name: 'Yusuf Mohammed',
            type: 'struggling',
            severity: 'high',
            title: 'Yusuf is struggling with AI concepts',
            message: 'Yusuf has been consistently scoring below 70% accuracy. He may need additional support.',
            recommendations: [
              'Schedule a one-on-one session',
              'Review basic neural network concepts',
              'Assign simpler experiments to rebuild confidence',
              'Pair with a peer mentor'
            ],
            data_points: {
              recent_accuracy: 0.69,
              best_accuracy: 0.71,
              improvement_rate: 0.01
            }
          },
          {
            alert_id: 'alert_002',
            student_id: 'std_002',
            student_name: 'Yusuf Mohammed',
            type: 'disengaged',
            severity: 'high',
            title: 'Yusuf appears disengaged',
            message: 'Yusuf has low activity and collaboration. He may be losing interest or facing challenges.',
            recommendations: [
              'Check in personally about his experience',
              'Identify potential technical or motivational barriers',
              'Connect him with peer study groups',
              'Highlight his past successes to rebuild motivation'
            ],
            data_points: {
              activity_level: 0.2,
              collaboration_score: 0.3,
              last_active: '2025-01-10'
            }
          },
          {
            alert_id: 'alert_003',
            student_id: 'std_001',
            student_name: 'Kareem Mostafa',
            type: 'improving',
            severity: 'low',
            title: 'Kareem is making excellent progress!',
            message: 'Kareem has shown rapid improvement and strong performance. He\'s on an excellent trajectory!',
            recommendations: [
              'Recognize his progress in class',
              'Challenge him with advanced projects',
              'Consider him as a peer mentor',
              'Encourage him to share insights on social feed'
            ],
            data_points: {
              recent_accuracy: 0.983,
              improvement_rate: 0.15,
              projects_completed: 5
            }
          }
        ],
        summary: {
          high_severity: 2,
          medium_severity: 0,
          low_severity: 1
        },
        generated_at: new Date().toISOString()
      };

      setTimeout(() => {
        setAlerts(mockAlerts);
        setLoading(false);
      }, 1500);
    };

    generateAlerts();
  }, [classroom]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-900 bg-opacity-40 border-red-700 text-red-200';
      case 'medium': return 'bg-yellow-900 bg-opacity-40 border-yellow-700 text-yellow-200';
      case 'low': return 'bg-green-900 bg-opacity-40 border-green-700 text-green-200';
      default: return 'bg-gray-900 bg-opacity-40 border-gray-700 text-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Teacher Alerts 🎯
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Get intelligent alerts about student progress and engagement. Identify students who need support or recognition.
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

      {!loading && alerts && (
        <>
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'alerts'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Alerts ({alerts.total_alerts})
            </button>
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
          </div>

          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {alerts.alerts.map((alert) => (
                <div
                  key={alert.alert_id}
                  className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}
                  style={{ borderLeftWidth: '6px' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getSeverityIcon(alert.severity)}</span>
                      <h4 className="font-semibold">{alert.title}</h4>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-800' :
                      alert.severity === 'medium' ? 'bg-yellow-800' :
                      'bg-green-800'
                    }`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-3 text-sm">{alert.message}</p>
                  
                  <div>
                    <h5 className="font-medium text-yellow-400 mb-2">Recommended Actions:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {alert.recommendations.map((rec, i) => (
                        <div
                          key={i}
                          className="p-2 bg-black bg-opacity-40 rounded border border-opacity-50 border-gray-600 text-sm"
                        >
                          • {rec}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Data Points */}
                  <div className="mt-3 pt-3 border-t border-opacity-30 border-gray-600">
                    <div className="text-xs text-gray-400">
                      Student: <strong>{alert.student_name}</strong> | 
                      Generated: {new Date(alert.generated_at || alerts.generated_at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              {/* Severity Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-red-900 bg-opacity-40 border border-red-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-200">{alerts.summary.high_severity}</div>
                  <div className="text-red-300">High Priority</div>
                  <div className="text-red-400 text-sm">🔴 Urgent attention needed</div>
                </div>
                <div className="p-4 bg-yellow-900 bg-opacity-40 border border-yellow-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-200">{alerts.summary.medium_severity}</div>
                  <div className="text-yellow-300">Medium Priority</div>
                  <div className="text-yellow-400 text-sm">🟡 Monitor progress</div>
                </div>
                <div className="p-4 bg-green-900 bg-opacity-40 border border-green-700 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-200">{alerts.summary.low_severity}</div>
                  <div className="text-green-300">Low Priority</div>
                  <div className="text-green-400 text-sm">🟢 Positive trends</div>
                </div>
              </div>

              {/* Alert Types */}
              <div className="p-4 bg-gradient-to-r from-indigo-900 to-purple-900 bg-opacity-40 border border-indigo-700 rounded-lg">
                <h4 className="font-semibold text-indigo-200 mb-3">Alert Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-red-400">🔴</span>
                    <span className="text-gray-200">Struggling Student</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-400">🔴</span>
                    <span className="text-gray-200">Disengaged Student</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">🟡</span>
                    <span className="text-gray-200">Stagnant Progress</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">🟢</span>
                    <span className="text-gray-200">Improving Student</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400">🌟</span>
                    <span className="text-gray-200">Excelling Student</span>
                  </div>
                </div>
              </div>

              {/* Generated Time */}
              <div className="p-4 bg-black bg-opacity-40 rounded-lg border border-gray-600">
                <div className="text-sm text-gray-400">
                  Last analyzed: {new Date(alerts.generated_at).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes student performance, activity, and collaboration to identify those who need support. 
          In the full version, this connects to a machine learning model that predicts student needs.
        </p>
      </div>
    </div>
  );
};

export default TeacherAlerts;
