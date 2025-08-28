/**
 * AetherAI - Career Advisor Component
 * File: CareerAdvisor.jsx
 * Purpose: Show AI-powered career guidance to students
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students connect their AI skills to future universities and careers.
 */

import React, { useState, useEffect } from 'react';

const CareerAdvisor = ({ studentProfile }) => {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!studentProfile) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock advice based on profile
      const accuracy = studentProfile.bestAccuracy || 0.983;
      const projects = studentProfile.projectsCompleted || 5;
      
      const mockAdvice = {
        student_level: {
          level: accuracy >= 0.97 && projects >= 4 ? "World-Class" : 
                 accuracy >= 0.95 && projects >= 3 ? "Excellent" : 
                 accuracy >= 0.90 && projects >= 2 ? "Good" : "Developing",
          emoji: accuracy >= 0.97 && projects >= 4 ? "🚀" : 
                 accuracy >= 0.95 && projects >= 3 ? "🏆" : 
                 accuracy >= 0.90 && projects >= 2 ? "👍" : "🌱",
          description: `You're performing at a ${accuracy >= 0.97 && projects >= 4 ? "world-class" : 
                      accuracy >= 0.95 && projects >= 3 ? "excellent" : 
                      accuracy >= 0.90 && projects >= 2 ? "good" : "developing"} level in AI`
        },
        recommended_universities: accuracy >= 0.97 && projects >= 4 ? [
          { name: "MIT", match: "Strong Match", focus: "AI Research", location: "Cambridge, USA", advice: "Focus on research publications and math competitions" },
          { name: "Stanford", match: "Strong Match", focus: "AI Entrepreneurship", location: "California, USA", advice: "Build startups and participate in hackathons" },
          { name: "Oxford", match: "Good Potential", focus: "Theoretical AI", location: "Oxford, UK", advice: "Focus on mathematics and theoretical computer science" }
        ] : accuracy >= 0.95 && projects >= 3 ? [
          { name: "Stanford", match: "Strong Match", focus: "AI Entrepreneurship", location: "California, USA", advice: "Build startups and participate in hackathons" },
          { name: "Oxford", match: "Strong Match", focus: "Theoretical AI", location: "Oxford, UK", advice: "Focus on mathematics and theoretical computer science" },
          { name: "ETH Zurich", match: "Good Potential", focus: "Engineering Excellence", location: "Zurich, Switzerland", advice: "Emphasize engineering projects and technical skills" }
        ] : accuracy >= 0.90 && projects >= 2 ? [
          { name: "National University of Singapore", match: "Strong Match", focus: "AI in Asia", location: "Singapore", advice: "Focus on regional AI challenges and innovation" },
          { name: "Cairo University", match: "Strong Match", focus: "Local AI Development", location: "Cairo, Egypt", advice: "Build solutions for local community problems" },
          { name: "Future University in Egypt", match: "Good Potential", focus: "Tech Innovation", location: "New Cairo, Egypt", advice: "Focus on practical applications and industry projects" }
        ] : [
          { name: "Cairo University", match: "Good Potential", focus: "Local AI Development", location: "Cairo, Egypt", advice: "Build solutions for local community problems" },
          { name: "Future University in Egypt", match: "Good Potential", focus: "Tech Innovation", location: "New Cairo, Egypt", advice: "Focus on practical applications and industry projects" }
        ],
        career_paths: accuracy >= 0.97 && projects >= 4 ? [
          "AI Research Scientist",
          "Machine Learning Engineer at top tech company",
          "PhD in Artificial Intelligence"
        ] : accuracy >= 0.95 && projects >= 3 ? [
          "AI Developer",
          "Data Scientist",
          "MSc in Machine Learning"
        ] : accuracy >= 0.90 && projects >= 2 ? [
          "Junior AI Engineer",
          "Data Analyst",
          "BSc in Computer Science with AI focus"
        ] : [
          "AI Student",
          "Beginner Data Analyst",
          "High School AI Club Member"
        ],
        next_steps: accuracy >= 0.97 && projects >= 4 ? [
          "Publish your research on arXiv",
          "Apply for research internships",
          "Participate in international AI competitions"
        ] : accuracy >= 0.95 && projects >= 3 ? [
          "Build a portfolio of AI projects",
          "Contribute to open-source AI projects",
          "Apply for AI internships"
        ] : accuracy >= 0.90 && projects >= 2 ? [
          "Complete more AI projects",
          "Learn advanced mathematics for AI",
          "Join AI study groups"
        ] : [
          "Complete beginner AI courses",
          "Practice with MNIST and CIFAR-10",
          "Collaborate with classmates"
        ],
        encouragement: [
          "Your journey in AI has just begun! Keep learning and experimenting.",
          "Every expert was once a beginner. You're on your way to greatness.",
          "Don't compare yourself to others. Focus on your own progress.",
          "You're building valuable skills that will open doors worldwide.",
          "Believe in yourself. You have the potential to change the world with AI."
        ][Math.floor(Math.random() * 5)]
      };

      setAdvice(mockAdvice);
      setLoading(false);
    }, 1500);
  }, [studentProfile]);

  if (!studentProfile) {
    return (
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl text-center">
        <p className="text-gray-400 text-sm">Complete AI experiments to get career guidance</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        AI Career Advisor 🎓
      </h3>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          <span className="ml-3 text-gray-400">Generating career guidance...</span>
        </div>
      ) : advice ? (
        <div className="space-y-6">
          {/* Student Level */}
          <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 bg-opacity-40 border border-blue-700 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-300">Your Level</div>
                <div className="text-2xl font-bold text-white">
                  {advice.student_level.level} {advice.student_level.emoji}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-300">Based on your AI performance</div>
              </div>
            </div>
            <p className="text-gray-200 text-sm mt-2">{advice.student_level.description}</p>
          </div>

          {/* Recommended Universities */}
          <div>
            <h4 className="font-semibold text-purple-400 mb-3">🏫 Recommended Universities</h4>
            <div className="space-y-3">
              {advice.recommended_universities.map((uni, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border ${
                    uni.match === "Strong Match"
                      ? "bg-gradient-to-r from-purple-900 to-pink-900 bg-opacity-40 border-purple-700"
                      : "bg-gray-900 bg-opacity-50 border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{uni.name}</div>
                      <div className="text-sm text-gray-300">{uni.location}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded ${
                        uni.match === "Strong Match"
                          ? "bg-green-800 text-green-200"
                          : "bg-yellow-800 text-yellow-200"
                      }`}>
                        {uni.match}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">Focus: {uni.focus}</div>
                  <p className="text-gray-300 text-sm mt-1 italic">"{uni.advice}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Career Paths */}
          <div>
            <h4 className="font-semibold text-green-400 mb-3">💼 Career Paths</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {advice.career_paths.map((path, i) => (
                <div
                  key={i}
                  className="p-3 bg-green-900 bg-opacity-40 border border-green-800 rounded-lg text-sm text-green-200 text-center"
                >
                  {path}
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h4 className="font-semibold text-yellow-400 mb-3">📌 Next Steps</h4>
            <div className="space-y-2">
              {advice.next_steps.map((step, i) => (
                <div
                  key={i}
                  className="p-3 bg-gradient-to-r from-yellow-900 to-orange-900 bg-opacity-40 border border-yellow-800 rounded-lg text-sm"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Encouragement */}
          <div className="p-4 bg-gradient-to-r from-indigo-900 to-purple-900 bg-opacity-60 border border-purple-700 rounded-lg text-center">
            <p className="text-gray-200 italic">"{advice.encouragement}"</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎓</div>
          <p className="text-gray-400 text-sm">Career guidance will appear after completing experiments</p>
        </div>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes your AI experiment results and provides personalized career guidance 
          to help you plan your future in AI. In the full version, this connects to an AI model on the server.
        </p>
      </div>
    </div>
  );
};

export default CareerAdvisor;
