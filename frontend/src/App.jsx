/**
 * AetherAI - Final Integrated Frontend Application (v0.8)
 * File: App.jsx
 * Purpose: Full AI experiment workflow with interactive training visualization
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Democratizing AI research for students in developing countries
 * GitHub: https://github.com/kareemcompsci07/aetherai
 * Email: kareemcompsci.07@gmail.com
 * 
 * This component orchestrates the entire user journey:
 * 1. Upload dataset
 * 2. View automatic analysis and suggestions
 * 3. Get smart hyperparameter recommendations
 * 4. Chat with AI Mentor for help
 * 5. Visualize training process interactively
 * 6. Choose or build a custom model
 * 7. Train on cloud (simulated)
 * 8. View results with charts
 * 9. Get AI-generated natural language insights
 * 10. Generate professional PDF report
 * 
 * Built entirely from a mobile device in Egypt — proving innovation has no borders.
 */

import React, { useState, useEffect } from 'react';

// Components
import DatasetUploader from './components/DatasetUploader';
import DatasetAnalysis from './components/DatasetAnalysis';
import HyperparameterSuggester from './components/HyperparameterSuggester';
import AIMentor from './components/AIMentor';
import TrainingVisualizer from './components/TrainingVisualizer';
import ModelSelector from './components/ModelSelector';
import CustomModelBuilder from './components/CustomModelBuilder';
import TrainingDashboard from './components/TrainingDashboard';
import ResultsViewer from './components/ResultsViewer';
import AIInsights from './components/AIInsights';
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
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [analysis, setAnalysis] = useState(null);

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
    setAnalysis(null);
  };

  const handleModelSelect = (modelId) => {
    setModel(modelId);
    setTrainingComplete(false);
    setShowCustomBuilder(false);
  };

  const handleCustomModelCreated = (config) => {
    setModel(`${config.type}-custom`);
    setShowCustomBuilder(false);
    setTrainingComplete(false);
  };

  const handleTrainingComplete = () => {
    setTrainingComplete(true);
  };

  const handleDatasetAnalyzed = (analysisData) => {
    setAnalysis(analysisData.analysis);
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
          <DatasetUploader 
            onDatasetSelect={handleDatasetSelect} 
            onAnalysisComplete={handleDatasetAnalyzed} 
          />
          
          {analysis && <DatasetAnalysis analysis={analysis} />}
          
          {(dataset && model) && (
            <HyperparameterSuggester model={model} dataset={dataset} />
          )}
          
          <AIMentor />
          
          {trainingComplete && (
            <TrainingVisualizer 
              metrics={{
                accuracy: [0.1, 0.45, 0.67, 0.78, 0.82, 0.86, 0.89, 0.91, 0.95, 0.983],
                loss: [2.3, 1.8, 1.4, 1.1, 0.9, 0.7, 0.6, 0.5, 0.4, 0.054]
              }}
              modelType={model}
            />
          )}
          
          {!showCustomBuilder ? (
            <ModelSelector onModelSelect={handleModelSelect} />
          ) : (
            <CustomModelBuilder onModelCreated={handleCustomModelCreated} />
          )}
          
          {/* Toggle between preset and custom */}
          <div className="text-center">
            <button
              onClick={() => setShowCustomBuilder(!showCustomBuilder)}
              className="text-sm text-cyan-400 hover:underline"
            >
              {showCustomBuilder ? "← Use Preset Models" : "🔧 Build a Custom Model"}
            </button>
          </div>
        </div>

        {/* Right Column: Output & Actions */}
        <div className="space-y-8">
          <TrainingDashboard 
            dataset={dataset} 
            model={model} 
            onTrainingComplete={handleTrainingComplete} 
          />
          
          {trainingComplete && <ResultsViewer />}
          
          {trainingComplete && <AIInsights experimentData={{
            model,
            dataset,
            finalAccuracy: 98.3,
            metrics: {
              accuracy: [0.1, 0.45, 0.67, 0.78, 0.82, 0.86, 0.89, 0.91, 0.95, 0.983],
              loss: [2.3, 1.8, 1.4, 1.1, 0.9, 0.7, 0.6, 0.5, 0.4, 0.054]
            }
          }} />}
          
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
          AetherAI v0.8.0 • Built for accessibility, education, and global impact
        </div>
      </footer>
    </div>
  );
};

export default App;
