/**
 * AetherAI - API Service Layer (v2.7 with Ethics Detection)
 * File: api.js
 * Purpose: Centralized HTTP client for frontend-backend communication
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Connect students to cloud AI training with one simple API.
 * GitHub: https://github.com/kareemcompsci07/aetherai
 * Email: kareemcompsci.07@gmail.com
 */

import axios from 'axios';

// Base API URL (will be configured based on environment)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (for logging and auth in future)
api.interceptors.request.use(
  (config) => {
    console.log(`[API] Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (for error handling)
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Success: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const errorMsg = error.response
      ? `Error ${error.response.status}: ${error.response.data.detail || error.message}`
      : 'Network error or server unreachable';
    
    console.error(`[API] Failed: ${errorMsg}`);
    
    // User-friendly message
    if (!navigator.onLine) {
      alert('⚠️ No internet connection. Please check your network.');
    } else if (error.code === 'ECONNABORTED') {
      alert('⏳ Request timed out. The server may be busy. Please try again.');
    } else {
      alert(`❌ API Error: ${errorMsg}`);
    }

    return Promise.reject(error);
  }
);

// API Endpoints
const ApiService = {
  // Health check
  async healthCheck() {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload dataset
  async uploadDataset(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/api/v1/datasets/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`[Upload] ${progress}%`);
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Analyze dataset
  async analyzeDataset(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/api/v1/datasets/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Dataset Analysis API Error:', error);
      throw error;
    }
  },

  // Get hyperparameter suggestion
  async getHyperparameterSuggestion(config) {
    try {
      const response = await api.post('/api/v1/suggestions/hyperparameters', config);
      return response.data;
    } catch (error) {
      console.error('Hyperparameter Suggestion API Error:', error);
      throw error;
    }
  },

  // Send message to AI Mentor
  async sendMessageToMentor(message) {
    try {
      const response = await api.post('/api/v1/mentor/chat', { message });
      return response.data;
    } catch (error) {
      console.error('AI Mentor API Error:', error);
      throw error;
    }
  },

  // Get visualization data
  async getVisualizationData(experimentId) {
    try {
      const response = await api.get(`/api/v1/visualization/${experimentId}`);
      return response.data;
    } catch (error) {
      console.error('Visualization API Error:', error);
      throw error;
    }
  },

  // Share experiment with classmates
  async shareExperiment(config) {
    try {
      const response = await api.post('/api/v1/collaboration/share', config);
      return response.data;
    } catch (error) {
      console.error('Collaboration API Error:', error);
      throw error;
    }
  },

  // Get AI-powered experiment review
  async reviewExperiment(results) {
    try {
      const response = await api.post('/api/v1/review/experiment', results);
      return response.data;
    } catch (error) {
      console.error('Experiment Review API Error:', error);
      throw error;
    }
  },

  // Get global leaderboard
  async getLeaderboard(dataset) {
    try {
      const response = await api.get(`/api/v1/leaderboard/${dataset}`);
      return response.data;
    } catch (error) {
      console.error('Leaderboard API Error:', error);
      throw error;
    }
  },

  // Get real-time training simulation data
  async getTrainingSimulation(model, dataset) {
    try {
      const response = await api.get(`/api/v1/simulation/${model}/${dataset}`);
      return response.data;
    } catch (error) {
      console.error('Training Simulation API Error:', error);
      throw error;
    }
  },

  // Debug error log
  async debugError(errorLog) {
    try {
      const response = await api.post('/api/v1/debug/analyze', { error_log: errorLog });
      return response.data;
    } catch (error) {
      console.error('Debug Assistant API Error:', error);
      throw error;
    }
  },

  // Calculate carbon savings
  async calculateCarbonSavings(trainingTimeMinutes) {
    try {
      const response = await api.post('/api/v1/carbon/calculate', { 
        training_time_minutes: trainingTimeMinutes 
      });
      return response.data;
    } catch (error) {
      console.error('Carbon Savings API Error:', error);
      throw error;
    }
  },

  // Get career advice
  async getCareerAdvice(profile) {
    try {
      const response = await api.post('/api/v1/career/advise', profile);
      return response.data;
    } catch (error) {
      console.error('Career Advisor API Error:', error);
      throw error;
    }
  },

  // Get classroom summary
  async getClassroomSummary(classId) {
    try {
      const response = await api.get(`/api/v1/classroom/summary/${classId}`);
      return response.data;
    } catch (error) {
      console.error('Classroom Summary API Error:', error);
      throw error;
    }
  },

  // Get student progress
  async getStudentProgress(classId, studentId) {
    try {
      const response = await api.get(`/api/v1/classroom/student/${classId}/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Student Progress API Error:', error);
      throw error;
    }
  },

  // Generate research paper
  async generateResearchPaper(experimentData) {
    try {
      const response = await api.post('/api/v1/paper/generate', experimentData);
      return response.data;
    } catch (error) {
      console.error('Research Paper Generator API Error:', error);
      throw error;
    }
  },

  // NEW: Detect bias in dataset
  async detectBias(datasetInfo) {
    /**
     * Detect potential bias and ethical concerns in a dataset
     * @param {Object} datasetInfo - Dataset characteristics
     * @returns {Object} Bias report with ethical concerns and recommendations
     */
    try {
      const response = await api.post('/api/v1/ethics/detect', datasetInfo);
      return response.data;
    } catch (error) {
      console.error('Ethics Detector API Error:', error);
      throw error;
    }
  },

  // NEW: Generate ethics report
  async generateEthicsReport(datasetInfo) {
    /**
     * Generate comprehensive ethics report for a dataset
     * @param {Object} datasetInfo - Dataset characteristics
     * @returns {Object} Comprehensive ethics report with educational content
     */
    try {
      const response = await api.post('/api/v1/ethics/report', datasetInfo);
      return response.data;
    } catch (error) {
      console.error('Ethics Report API Error:', error);
      throw error;
    }
  },

  // Start training
  async startTraining(config) {
    try {
      const response = await api.post('/api/v1/training/start', config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get training status
  async getTrainingStatus(jobId) {
    try {
      const response = await api.get(`/api/v1/training/status/${jobId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get results
  async getResults(experimentId) {
    try {
      const response = await api.get(`/api/v1/results/${experimentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Generate PDF report
  async generateReport(experimentId) {
    try {
      const response = await api.post(
        `/api/v1/reports/generate`,
        { experiment_id: experimentId },
        { responseType: 'blob' } // Important for file download
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get AI-generated insights
  async getAIInsights(data) {
    try {
      const response = await api.post('/api/v1/ai-insights', data);
      return response.data;
    } catch (error) {
      console.error('AI Insights API Error:', error);
      throw error;
    }
  },

  // Create custom model
  async createModel(config) {
    try {
      const response = await api.post('/api/v1/models/create', config);
      return response.data;
    } catch (error) {
      console.error('Create Model API Error:', error);
      throw error;
    }
  }
};

export default ApiService;
