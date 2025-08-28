/**
 * AetherAI - API Service Layer (v0.6 with AI Mentor)
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

  // NEW: Send message to AI Mentor
  async sendMessageToMentor(message) {
    /**
     * Send a message to the AI Mentor and get educational response
     * @param {string} message - Student's question about AI
     * @returns {Object} AI response with educational content
     */
    try {
      // In full version: connect to Hugging Face API
      // const response = await api.post('/api/v1/mentor/chat', { message });
      // return response.data;

      // For now: return success to simulate
      return {
        success: true,
        message: "Message received. In full version: connects to Hugging Face for AI responses."
      };
    } catch (error) {
      console.error('AI Mentor API Error:', error);
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
