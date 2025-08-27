/**
 * AetherAI - Report Generator Component
 * File: ReportGenerator.jsx
 * Purpose: Auto-generate experiment report in PDF format
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Every student should be able to share their AI experiment professionally.
 */

import React, { useState } from 'react';

const ReportGenerator = ({ experimentData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportUrl, setReportUrl] = useState(null);

  const mockData = experimentData || {
    model: "CNN",
    dataset: "MNIST",
    finalAccuracy: 98.3,
    finalLoss: 0.054,
    epochs: 10,
    trainingTime: "2:18",
    date: new Date().toLocaleDateString(),
    studentName: "Student Researcher",
    institution: "AetherAI Lab"
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    // Simulate PDF generation delay
    setTimeout(() => {
      const fakeUrl = `https://aetherai.reports/${Date.now()}.pdf`;
      setReportUrl(fakeUrl);
      setIsGenerating(false);
    }, 3000);
  };

  const handleDownload = () => {
    alert("✅ Simulated PDF Download\n\nIn full version: Actual PDF with charts, code, and analysis generated via WeasyPrint + Jinja2 templates.\n\nThank you for using AetherAI!");
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Experiment Report Generator
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Create a professional PDF report of your AI experiment to share with teachers, peers, or colleges.
      </p>

      {/* Experiment Summary */}
      <div className="mb-6 p-4 bg-black bg-opacity-40 rounded-lg border border-gray-700">
        <h4 className="font-semibold text-white mb-3">Experiment Details</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
          <div><strong>Model:</strong> {mockData.model}</div>
          <div><strong>Dataset:</strong> {mockData.dataset}</div>
          <div><strong>Accuracy:</strong> <span className="text-green-400">{mockData.finalAccuracy}%</span></div>
          <div><strong>Loss:</strong> {mockData.finalLoss.toFixed(3)}</div>
          <div><strong>Epochs:</strong> {mockData.epochs}</div>
          <div><strong>Time:</strong> {mockData.trainingTime} min</div>
        </div>
      </div>

      {/* Generate Button */}
      {!reportUrl ? (
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 disabled:from-gray-700 disabled:to-gray-700 text-black font-bold rounded-lg hover:from-purple-500 hover:to-indigo-500 transition disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Report...
            </>
          ) : (
            "📄 Generate Auto-Report (PDF)"
          )}
        </button>
      ) : (
        <div className="text-center">
          <div className="p-3 bg-green-900 bg-opacity-40 border border-green-700 rounded-lg mb-4">
            <p className="text-green-300 font-semibold">✅ Report Generated Successfully!</p>
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-lg hover:from-green-400 hover:to-emerald-500 transition transform hover:scale-105"
          >
            ⬇️ Download PDF Report
          </button>
        </div>
      )}

      {/* Report Preview Info */}
      <div className="mt-6 p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h5 className="font-medium text-white mb-2">📄 Report Includes:</h5>
        <ul className="text-gray-400 text-xs space-y-1">
          <li>• Experiment configuration (model, dataset, hyperparameters)</li>
          <li>• Training metrics & charts (accuracy, loss)</li>
          <li>• Final performance analysis</li>
          <li>• Shareable format for teachers, universities, or portfolios</li>
          <li>• Built with Jinja2 + WeasyPrint (open-source stack)</li>
        </ul>
      </div>

      <p className="text-xs text-gray-500 text-center mt-4">
        AetherAI: Democratizing AI research for students in developing countries 🌍
      </p>
    </div>
  );
};

export default ReportGenerator;
