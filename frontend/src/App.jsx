/**
 * AetherAI - Integrated Frontend Application
 * File: App.jsx
 * Purpose: Full AI experiment workflow from dataset to report
 * Created by: Kareem Mostafa
 * Location: Future City, Cairo, Egypt
 * Year: 2025
 * Vision: Democratizing AI research for students in developing countries
 * GitHub: https://github.com/kareemcompsci07/aetherai
 * Email: kareemcompsci.07@gmail.com
 * 
 * This component orchestrates the entire user journey:
 * 1. Select or upload dataset
 * 2. Choose model architecture
 * 3. Train on cloud (simulated)
 * 4. View results with charts
 * 5. Generate professional PDF report
 * 
 * Built entirely from a mobile device in Egypt — proving innovation has no borders.
 */

import React, { useState, useEffect } from 'react';

// Components
import DatasetUploader from './components/DatasetUploader';
import ModelSelector from './components/ModelSelector';
import TrainingDashboard from './components/TrainingDashboard';
import ResultsViewer from './components/ResultsViewer';
import ReportGenerator from './components/ReportGenerator';

// Services
import ApiService from './services/api';

// Main App Component
const App = () => {
  // State
  const [dataset, setDataset] = useState('');
  const [model, setModel] = useState('');
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking...');

  // Check backend health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        await ApiService.healthCheck();
        setBackendStatus('Connected ✅');
      } catch (error) {
        setBackendStatus('Not reachable ⚠️ (Run backend)');
      }
    };
    checkHealth();
  }, []);

  // Handlers
  const handleDatasetSelect = (name) => {
    setDataset(name);
    setTrainingComplete(false);
  };

  const handleModelSelect = (modelId) => {
    setModel(modelId);
    setTrainingComplete(false);
  };

  const handleTrainingComplete = () => {
    setTrainingComplete(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navbar */}
      <nav className="bg-black bg-opacity-50 backdrop-blur-md border-b border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-bold">Aether<span className="text-cyan-400">AI</span></h1>
          </div>
          <div className="text-sm text-gray-300">Backend: {backendStatus}</div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Input */}
        <div className="space-y-8">
          <DatasetUploader onDatasetSelect={handleDatasetSelect} />
          <ModelSelector onModelSelect={handleModelSelect} />
        </div>

        {/* Right Column: Output & Actions */}
        <div className="space-y-8">
          <TrainingDashboard 
            dataset={dataset} 
            model={model} 
            onTrainingComplete={handleTrainingComplete} 
          />
          
          {trainingComplete && <ResultsViewer />}
          
          {trainingComplete && <ReportGenerator />}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-800">
        <p>
          Developed by <strong className="text-cyan-400">Kareem Mostafa</strong> with ❤️ in 
          <span className="text-yellow-400"> Future City, Cairo, Egypt</span>
        </p>
        <p className="mt-1">
          Open-source platform for students without GPUs. 
          <br />
          Vision: To become the <strong>"Kaggle for Students"</strong> in developing countries.
        </p>
        <div className="mt-4 text-xs opacity-70">
          AetherAI v0.1.0 • Built for accessibility, education, and global impact
        </div>
      </footer>
    </div>
  );
};

export default App;
