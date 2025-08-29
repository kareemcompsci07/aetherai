/**
 * AetherAI - Final Integrated Frontend Application (v3.7)
 * File: App.jsx
 * Purpose: Full AI experiment workflow with teacher intervention alerts
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Democratizing AI research for students in developing countries
 * GitHub: https://github.com/kareemcompsci07/aetherai
 * Email: kareemcompsci.07@gmail.com
 * 
 * This component orchestrates the entire user journey with teacher alerts:
 * 1. Upload dataset
 * 2. View automatic analysis and suggestions
 * 3. Get smart hyperparameter recommendations
 * 4. Chat with AI Mentor for help
 * 5. Use voice assistant in Arabic or English
 * 6. Visualize training in true 3D with Three.js
 * 7. Detect bias and ethical issues in datasets
 * 8. Work offline with PWA capabilities
 * 9. Share experiments in global social feed
 * 10. Get personalized learning path recommendations
 * 11. Switch between multiple languages
 * 12. Predict future performance and get motivational insights
 * 13. Get teacher alerts for classroom intervention
 * 14. Simulate training with animation
 * 15. Get AI-powered experiment review
 * 16. View global leaderboard
 * 17. Debug errors with AI assistance
 * 18. See environmental impact
 * 19. Get AI-powered career guidance
 * 20. Monitor students with teacher dashboard
 * 21. Generate research papers from experiments
 * 22. See the social impact of AetherAI
 * 23. Choose or build a custom model
 * 24. Train on cloud (simulated)
 * 25. View results with charts
 * 26. Get AI-generated natural language insights
 * 27. Generate professional PDF report
 * 
 * Built entirely from a mobile device in Egypt — proving innovation has no borders.
 */

import React, { useState, useEffect } from 'react';
import i18n from './i18n'; // Now imports from ./i18n/index.js

// Components
import DatasetUploader from './components/DatasetUploader';
import DatasetAnalysis from './components/DatasetAnalysis';
import HyperparameterSuggester from './components/HyperparameterSuggester';
import AIMentor from './components/AIMentor';
import VoiceAssistant from './components/VoiceAssistant';
import ARTrainingVisualizer from './components/ARTrainingVisualizer';
import EthicsDetector from './components/EthicsDetector';
import PWANotification from './components/PWANotification';
import SocialFeed from './components/SocialFeed';
import LearningPathGenerator from './components/LearningPathGenerator';
import ProgressPredictor from './components/ProgressPredictor';
import TeacherAlerts from './components/TeacherAlerts';
import TrainingVisualizer from './components/TrainingVisualizer';
import TrainingSimulator from './components/TrainingSimulator';
import CollaborationManager from './components/CollaborationManager';
import AIGoodDashboard from './components/AIGoodDashboard';
import ExperimentReviewer from './components/ExperimentReviewer';
import Leaderboard from './components/Leaderboard';
import DebugAssistant from './components/DebugAssistant';
import CarbonSavings from './components/CarbonSavings';
import CareerAdvisor from './components/CareerAdvisor';
import TeacherDashboard from './components/TeacherDashboard';
import ResearchPaperGenerator from './components/ResearchPaperGenerator';
import ModelSelector from './components/ModelSelector';
import CustomModelBuilder from './components/CustomModelBuilder';
import TrainingDashboard from './components/TrainingDashboard';
import ResultsViewer from './components/ResultsViewer';
import AIInsights from './components/AIInsights';
import ReportGenerator from './components/ReportGenerator';
import LanguageSwitcher from './components/LanguageSwitcher';

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
  const [language, setLanguage] = useState(i18n.getLanguage());

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

  // Subscribe to language changes
  useEffect(() => {
    const unsubscribe = i18n.subscribe((lang) => {
      setLanguage(lang);
    });
    return unsubscribe;
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

  const handleLanguageChange = (lang) => {
    i18n.setLanguage(lang);
  };

  const handleVoiceMessage = (userMessage, aiResponse) => {
    console.log('Voice interaction:', { userMessage, aiResponse });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Navbar */}
      <nav className="bg-black bg-opacity-50 backdrop-blur-md border-b border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <h1 className="text-2xl font-bold">Aether<span className="text-cyan-400">AI</span></h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              {i18n.t('app.backendStatus', { status: backendStatus })}
            </div>
            <LanguageSwitcher onLanguageChange={handleLanguageChange} />
          </div>
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
          
          <VoiceAssistant onSendMessage={handleVoiceMessage} />
          
          <ARTrainingVisualizer modelType={model} dataset={dataset} />
          
          <EthicsDetector datasetName={dataset} />
          
          <SocialFeed 
            experimentData={{
              model: model,
              dataset: dataset,
              finalAccuracy: trainingComplete ? 0.983 : 0,
              finalLoss: 0.054,
              trainingTime: trainingComplete ? 240 : 0
            }} 
          />
          
          <LearningPathGenerator 
            studentProfile={{
              student_id: "std_123",
              current_level: trainingComplete ? "intermediate" : "beginner",
              interests: ["AI", "Machine Learning"],
              goals: trainingComplete ? ["become AI researcher"] : ["learn AI basics"],
              country: "Egypt",
              best_accuracy: trainingComplete ? 0.983 : 0.7,
              projects_completed: trainingComplete ? 1 : 0,
              collaboration_score: trainingComplete ? 0.9 : 0.5,
              improvement_rate: trainingComplete ? 0.15 : 0.1
            }} 
          />
          
          <ProgressPredictor 
            studentProfile={{
              student_id: "std_123",
              name: "Kareem Mostafa",
              country: "Egypt",
              current_level: trainingComplete ? "intermediate" : "beginner",
              best_accuracy: trainingComplete ? 0.983 : 0.7,
              improvement_rate: trainingComplete ? 0.15 : 0.1,
              collaboration_score: trainingComplete ? 0.9 : 0.5,
              projects_completed: trainingComplete ? 1 : 0,
              past_experiments: trainingComplete ? [
                { accuracy: 0.85, loss: 0.4, model: "MLP", dataset: "MNIST" },
                { accuracy: 0.92, loss: 0.2, model: "CNN", dataset: "MNIST" },
                { accuracy: 0.96, loss: 0.1, model: "CNN", dataset: "CIFAR-10" },
                { accuracy: 0.983, loss: 0.054, model: "Custom CNN", dataset: "MNIST" }
              ] : []
            }} 
          />
          
          <TeacherAlerts 
            classroom={{
              class_id: "cls_101",
              teacher_id: "tch_001",
              students: [
                {
                  student_id: "std_001",
                  name: "Kareem Mostafa",
                  country: "Egypt",
                  accuracy_history: [0.85, 0.92, 0.96, 0.983],
                  activity_level: 0.9,
                  collaboration_score: 0.9,
                  improvement_rate: 0.15,
                  projects_completed: 5
                },
                {
                  student_id: "std_002",
                  name: "Yusuf Mohammed",
                  country: "Egypt",
                  accuracy_history: [0.65, 0.68, 0.70, 0.69, 0.71],
                  activity_level: 0.2,
                  collaboration_score: 0.3,
                  improvement_rate: 0.01,
                  projects_completed: 2
                }
              ]
            }} 
          />
          
          {trainingComplete && (
            <TrainingVisualizer 
              metrics={{
                accuracy: [0.1, 0.45, 0.67, 0.78, 0.82, 0.86, 0.89, 0.91, 0.95, 0.983],
                loss: [2.3, 1.8, 1.4, 1.1, 0.9, 0.7, 0.6, 0.5, 0.4, 0.054]
              }}
              modelType={model}
            />
          )}
          
          <TrainingSimulator modelType={model} dataset={dataset} />
          
          {trainingComplete && (
            <CollaborationManager experimentId="exp_123" />
          )}
          
          {trainingComplete && (
            <ExperimentReviewer 
              results={{
                finalAccuracy: 0.983,
                finalLoss: 0.054,
                trainingTime: 240,
                model: "cnn",
                dataset: "mnist",
                epochs: 10
              }} 
            />
          )}
          
          <Leaderboard />
          
          <DebugAssistant />
          
          <CarbonSavings trainingTimeMinutes={240} />
          
          <CareerAdvisor 
            studentProfile={{
              bestAccuracy: 0.983,
              projectsCompleted: 5,
              collaborationScore: 0.9,
              improvementRate: 0.15,
              country: "Egypt"
            }} 
          />
          
          <TeacherDashboard />
          
          <ResearchPaperGenerator 
            experimentData={{
              model: "cnn",
              dataset: "mnist",
              finalAccuracy: 0.983,
              finalLoss: 0.054,
              trainingTime: 240,
              epochs: 10
            }} 
          />
          
          <AIGoodDashboard />
          
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
          {i18n.t('footer.developedBy')} <strong className="text-cyan-400">Kareem Mostafa</strong> {i18n.t('footer.with')} ❤️ {i18n.t('footer.in')} 
          <span className="text-yellow-400"> Future City, Cairo, Egypt</span>
        </p>
        <p className="mt-1">
          {i18n.t('footer.vision')}
        </p>
        <div className="mt-4 text-xs opacity-70">
          {i18n.t('footer.version')}
        </div>
      </footer>

      {/* PWA Notification */}
      <PWANotification />
    </div>
  );
};

export default App;
