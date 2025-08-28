/**
 * AetherAI - AI for Good Dashboard
 * File: AIGoodDashboard.jsx
 * Purpose: Show the social impact of AetherAI on students worldwide
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Every student deserves access to AI education.
 */

import React from 'react';

const AIGoodDashboard = () => {
  // Mock data (in full version: fetch from server)
  const stats = {
    studentsReached: 1247,
    countries: 38,
    schools: 89,
    experimentsRun: 3156,
    carbonSaved: 2.4, // tons
    hoursSaved: 9843
  };

  const impactStories = [
    {
      title: "Student in Rural Egypt Trains First AI Model",
      story: "A high school student in a village with no lab used AetherAI to train her first CNN on MNIST — from her mobile phone.",
      location: "Minya, Egypt"
    },
    {
      title: "Girls' School in Nigeria Adopts AetherAI",
      story: "A STEM teacher introduced AetherAI to 45 students who had never seen a GPU. Now they run weekly AI competitions.",
      location: "Lagos, Nigeria"
    },
    {
      title: "Student with Visual Impairment Uses AI Mentor",
      story: "A blind student used the AI Mentor chat to understand model training — proving AI can make AI accessible.",
      location: "Cairo, Egypt"
    }
  ];

  const values = [
    { icon: "🌍", label: "Global Access", desc: "No GPU? No problem. Train AI from any device." },
    { icon: "📚", label: "Education First", desc: "Designed for learning, not just results." },
    { icon: "🤝", label: "Student Collaboration", desc: "Share experiments and learn together." },
    { icon: "💚", label: "Sustainable AI", desc: "Simulated training saves energy and costs." }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 bg-opacity-80 backdrop-blur-sm border border-purple-700 rounded-2xl p-6 shadow-2xl">
      <h3 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center">
        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
        AI for Good Dashboard 🌟
      </h3>

      <p className="text-gray-300 mb-6 text-sm leading-relaxed">
        AetherAI isn't just a tool — it's a movement to democratize AI education for students in developing countries.
        Here's how we're making a difference.
      </p>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Students Reached', value: stats.studentsReached, suffix: '+' },
          { label: 'Countries', value: stats.countries, suffix: '' },
          { label: 'Schools', value: stats.schools, suffix: '' },
          { label: 'Experiments', value: stats.experimentsRun, suffix: '+' },
          { label: 'Carbon Saved', value: stats.carbonSaved, suffix: 't', desc: 'vs GPU training' },
          { label: 'Hours Saved', value: stats.hoursSaved, suffix: 'h', desc: 'of setup time' }
        ].map((stat, i) => (
          <div key={i} className="p-4 bg-black bg-opacity-40 rounded-lg text-center border border-purple-800">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-yellow-400 text-lg font-bold">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-gray-300 text-xs">{stat.label}</div>
            {stat.desc && <div className="text-gray-500 text-xs mt-1">{stat.desc}</div>}
          </div>
        ))}
      </div>

      {/* Core Values */}
      <div className="mb-8">
        <h4 className="font-semibold text-purple-300 mb-4">Our Values</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {values.map((val, i) => (
            <div key={i} className="flex items-start space-x-3 p-3 bg-gray-900 bg-opacity-50 rounded-lg">
              <span className="text-2xl mt-1">{val.icon}</span>
              <div>
                <div className="font-medium text-white">{val.label}</div>
                <div className="text-gray-400 text-sm">{val.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Stories */}
      <div className="mb-6">
        <h4 className="font-semibold text-green-300 mb-4">Real Impact Stories</h4>
        <div className="space-y-4">
          {impactStories.map((story, i) => (
            <div key={i} className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 bg-opacity-60 border border-gray-700 rounded-lg">
              <h5 className="font-bold text-cyan-400">{story.title}</h5>
              <p className="text-gray-300 text-sm mt-2">{story.story}</p>
              <p className="text-gray-500 text-xs mt-2">📍 {story.location}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 bg-opacity-60 border border-blue-700 rounded-lg text-center">
        <h4 className="font-bold text-blue-300 mb-2">Join the Movement</h4>
        <p className="text-gray-300 text-sm">
          Are you a teacher, student, or developer who believes in accessible AI education?
          <br />
          <a href="https://github.com/kareemcompsci07/aetherai" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-cyan-400 hover:underline">
            Contribute to AetherAI
          </a> and help us reach 10,000 students by 2026.
        </p>
      </div>

      {/* Footer Note */}
      <div className="mt-6 text-center text-xs text-gray-500">
        Built by Kareem Mostafa in Egypt • Proving that innovation has no borders
      </div>
    </div>
  );
};

export default AIGoodDashboard;
