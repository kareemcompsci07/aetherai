/**
 * AetherAI - Teacher Dashboard Component
 * File: TeacherDashboard.jsx
 * Purpose: Show teacher dashboard for monitoring student progress
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Empower teachers to guide AI students effectively.
 */

import React, { useState } from 'react';

const TeacherDashboard = () => {
  const [activeClass, setActiveClass] = useState('cairo_science_10a');
  const [loading, setLoading] = useState(false);

  // Mock classroom data
  const classrooms = {
    cairo_science_10a: {
      class_name: "Science 10A",
      school: "El-Abtal Language School",
      teacher: "Dr. Amira Hassan",
      students_count: 28,
      students: [
        {
          id: "std_001",
          name: "Kareem Mostafa",
          best_accuracy: 0.983,
          best_loss: 0.054,
          projects_completed: 5,
          last_active: "2025-04-15T14:30:00Z",
          improvement_rate: 0.15,
          collaboration_score: 0.9
        },
        {
          id: "std_002",
          name: "Yusuf Mohammed",
          best_accuracy: 0.978,
          best_loss: 0.061,
          projects_completed: 4,
          last_active: "2025-04-15T13:45:00Z",
          improvement_rate: 0.12,
          collaboration_score: 0.85
        },
        {
          id: "std_003",
          name: "Lina Chen",
          best_accuracy: 0.992,
          best_loss: 0.041,
          projects_completed: 6,
          last_active: "2025-04-15T12:20:00Z",
          improvement_rate: 0.18,
          collaboration_score: 0.92
        },
        {
          id: "std_004",
          name: "Ahmed Hassan",
          best_accuracy: 0.965,
          best_loss: 0.078,
          projects_completed: 3,
          last_active: "2025-04-14T16:30:00Z",
          improvement_rate: 0.10,
          collaboration_score: 0.78
        },
        {
          id: "std_005",
          name: "Fatima Ali",
          best_accuracy: 0.951,
          best_loss: 0.092,
          projects_completed: 4,
          last_active: "2025-04-15T11:15:00Z",
          improvement_rate: 0.14,
          collaboration_score: 0.88
        }
      ]
    },
    future_city_stem_9b: {
      class_name: "STEM 9B",
      school: "Future City STEM Academy",
      teacher: "Prof. Mahmoud Ahmed",
      students_count: 32,
      students: [
        {
          id: "std_101",
          name: "Nina Patel",
          best_accuracy: 0.957,
          best_loss: 0.083,
          projects_completed: 4,
          last_active: "2025-04-15T10:20:00Z",
          improvement_rate: 0.13,
          collaboration_score: 0.82
        },
        {
          id: "std_102",
          name: "Carlos Rodriguez",
          best_accuracy: 0.945,
          best_loss: 0.095,
          projects_completed: 3,
          last_active: "2025-04-14T18:45:00Z",
          improvement_rate: 0.11,
          collaboration_score: 0.75
        }
      ]
    }
  };

  const currentClass = classrooms[activeClass];

  // Calculate class statistics
  const stats = currentClass ? {
    average_accuracy: currentClass.students.reduce((acc, s) => acc + s.best_accuracy, 0) / currentClass.students.length,
    average_loss: currentClass.students.reduce((acc, s) => acc + s.best_loss, 0) / currentClass.students.length,
    average_projects: currentClass.students.reduce((acc, s) => acc + s.projects_completed, 0) / currentClass.students.length,
    top_student: currentClass.students.reduce((prev, current) => 
      (prev.best_accuracy > current.best_accuracy) ? prev : current),
    most_improved: currentClass.students.reduce((prev, current) => 
      (prev.improvement_rate > current.improvement_rate) ? prev : current),
    most_collaborative: currentClass.students.reduce((prev, current) => 
      (prev.collaboration_score > current.collaboration_score) ? prev : current),
    active_students: currentClass.students.filter(s => {
      const lastActive = new Date(s.last_active);
      const now = new Date();
      const diffTime = Math.abs(now - lastActive);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays < 7;
    }).length
  } : null;

  const formatAccuracy = (acc) => `${(acc * 100).toFixed(1)}%`;
  const formatLoss = (loss) => loss.toFixed(3);

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Teacher Dashboard 👩‍🏫
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Monitor your students' AI learning progress and identify top performers.
      </p>

      {/* Class Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Class
        </label>
        <select
          value={activeClass}
          onChange={(e) => setActiveClass(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="cairo_science_10a">Science 10A - El-Abtal Language School</option>
          <option value="future_city_stem_9b">STEM 9B - Future City STEM Academy</option>
        </select>
      </div>

      {currentClass && stats && (
        <>
          {/* Class Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Avg Accuracy', value: formatAccuracy(stats.average_accuracy), color: 'text-green-400' },
              { label: 'Avg Loss', value: formatLoss(stats.average_loss), color: 'text-yellow-400' },
              { label: 'Avg Projects', value: stats.average_projects.toFixed(1), color: 'text-blue-400' },
              { label: 'Active Students', value: `${stats.active_students}/${currentClass.students_count}`, color: 'text-purple-400' }
            ].map((stat, i) => (
              <div key={i} className="p-3 bg-black bg-opacity-40 rounded-lg border border-gray-600 text-center">
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Top Students */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { title: 'Top Performer', student: stats.top_student, icon: '🏆', color: 'from-purple-900 to-pink-900' },
              { title: 'Most Improved', student: stats.most_improved, icon: '📈', color: 'from-green-900 to-emerald-900' },
              { title: 'Most Collaborative', student: stats.most_collaborative, icon: '🤝', color: 'from-blue-900 to-indigo-900' }
            ].map((item, i) => (
              <div key={i} className={`p-4 bg-gradient-to-br ${item.color} bg-opacity-40 border border-opacity-50 rounded-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="font-bold text-cyan-400">{item.student.name}</div>
                <div className="text-sm text-gray-200">
                  Accuracy: {formatAccuracy(item.student.best_accuracy)}
                </div>
                <div className="text-sm text-gray-300">
                  Projects: {item.student.projects_completed}
                </div>
              </div>
            ))}
          </div>

          {/* Student List */}
          <div className="mb-6">
            <h4 className="font-semibold text-purple-400 mb-3">📋 All Students ({currentClass.students.length})</h4>
            <div className="overflow-hidden rounded-lg border border-gray-600">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="text-left p-3 text-xs font-semibold text-gray-300 uppercase">Name</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-300 uppercase">Accuracy</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-300 uppercase">Loss</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-300 uppercase">Projects</th>
                    <th className="text-left p-3 text-xs font-semibold text-gray-300 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentClass.students.map((student, i) => {
                    const lastActive = new Date(student.last_active);
                    const now = new Date();
                    const diffTime = Math.abs(now - lastActive);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    const isActive = diffDays < 7;

                    return (
                      <tr 
                        key={i} 
                        className={`${
                          i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'
                        } hover:bg-gray-600 transition`}
                      >
                        <td className="p-3">
                          <div className="font-medium text-white">{student.name}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-green-400">{formatAccuracy(student.best_accuracy)}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-yellow-400">{formatLoss(student.best_loss)}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm text-gray-300">{student.projects_completed}</div>
                        </td>
                        <td className="p-3">
                          <div className={`flex items-center ${isActive ? 'text-green-400' : 'text-gray-500'}`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${isActive ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                            <span className="text-sm">{isActive ? 'Active' : 'Inactive'}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-black font-bold rounded-lg hover:from-blue-500 hover:to-cyan-500 transition">
              📊 Generate Report
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-black font-bold rounded-lg hover:from-green-500 hover:to-emerald-500 transition">
              ✉️ Send Feedback
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-black font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition">
              🏆 Recognize Students
            </button>
          </div>
        </>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          The teacher dashboard shows real-time student progress in AI experiments. 
          In the full version, this connects to the classroom management API.
        </p>
      </div>
    </div>
  );
};

export default TeacherDashboard;
