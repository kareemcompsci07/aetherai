/**
 * AetherAI - Voice Assistant Component
 * File: VoiceAssistant.jsx
 * Purpose: Enable voice interaction with the AI assistant
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AI education accessible through voice for all students.
 */

import React, { useState, useRef } from 'react';

const VoiceAssistant = ({ onSendMessage }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Check if browser supports speech recognition
  const isSpeechRecognitionAvailable = () => {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  };

  // Initialize speech recognition
  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Can be dynamically set to 'ar-EG'

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setResponse('');
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      
      // Auto-send message
      if (onSendMessage && speechResult.trim()) {
        onSendMessage(speechResult);
        generateAIResponse(speechResult);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return recognition;
  };

  const toggleListening = () => {
    if (!isSpeechRecognitionAvailable()) {
      alert('Your browser does not support speech recognition. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      if (!recognitionRef.current) {
        recognitionRef.current = initSpeechRecognition();
      }
      recognitionRef.current.start();
    }
  };

  const generateAIResponse = (userMessage) => {
    setIsSpeaking(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      let aiResponse = '';
      
      const msg = userMessage.toLowerCase();
      
      if (msg.includes('hello') || msg.includes('hi')) {
        aiResponse = "Hello! I'm your AI assistant. How can I help you with AI today?";
      }
      else if (msg.includes('accuracy') || msg.includes('loss')) {
        aiResponse = "Your model has achieved 98.3% accuracy with a loss of 0.054. This indicates excellent performance on the MNIST dataset.";
      }
      else if (msg.includes('error') || msg.includes('problem')) {
        aiResponse = "I can help you debug that. Please share the error message, and I'll provide specific solutions to fix it.";
      }
      else if (msg.includes('hyperparameter') || msg.includes('learning rate')) {
        aiResponse = "For your CNN model, I recommend a learning rate of 0.001 with the Adam optimizer. Consider batch sizes of 32 or 64 for optimal performance.";
      }
      else if (msg.includes('career') || msg.includes('university')) {
        aiResponse = "Based on your excellent performance, I recommend applying to MIT or Stanford for AI research programs. Your skills are world-class!";
      }
      else if (msg.includes('paper') || msg.includes('publish')) {
        aiResponse = "You can generate a research paper from your experiment using the Research Paper Generator. Your results are publication-worthy!";
      }
      else {
        aiResponse = "I understand you're asking about AI. Could you please provide more details about what you'd like to know? I'm here to help you learn.";
      }
      
      setResponse(aiResponse);
      
      // Text to speech
      if (synthRef.current) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        utterance.onend = () => {
          setIsSpeaking(false);
        };
        
        synthRef.current.speak(utterance);
      } else {
        setIsSpeaking(false);
      }
    }, 1000);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Voice Assistant 🎤
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Speak to your AI assistant in English or Arabic. Press the microphone to start.
      </p>

      {/* Voice Input */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-300">
            Voice Input
          </label>
          <div className="text-xs text-gray-400">
            {isSpeechRecognitionAvailable() ? 'Supported' : 'Not supported'}
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={toggleListening}
            disabled={!isSpeechRecognitionAvailable()}
            className={`w-full py-4 flex items-center justify-center space-x-3 ${
              isListening 
                ? 'bg-gradient-to-r from-red-600 to-pink-600' 
                : 'bg-gradient-to-r from-green-600 to-cyan-600'
            } disabled:from-gray-600 text-black font-bold rounded-lg hover:opacity-90 transition`}
          >
            {isListening ? (
              <>
                <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
                <span>Listening...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span>Press to Speak</span>
              </>
            )}
          </button>
        </div>

        {transcript && (
          <div className="mt-3 p-3 bg-gray-900 rounded-lg border border-gray-600">
            <div className="text-xs text-gray-400 mb-1">You said:</div>
            <div className="text-sm text-white">{transcript}</div>
          </div>
        )}
      </div>

      {/* AI Response */}
      {response && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-300">
              AI Response
            </label>
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="text-xs text-red-400 hover:text-red-300"
              >
                Stop Speaking
              </button>
            )}
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 bg-opacity-40 border border-blue-700 rounded-lg">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a2.5 2.5 0 110 5H9v-5z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-200 whitespace-pre-line">{response}</div>
                {isSpeaking && (
                  <div className="flex items-center mt-2 text-xs text-cyan-400">
                    <div className="flex space-x-1">
                      <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                      <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                      <div className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="ml-2">Speaking...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Language Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Language
        </label>
        <select
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          defaultValue="en"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>

      {/* Features */}
      <div className="p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">Supported Commands:</h4>
        <ul className="text-gray-300 text-xs space-y-1">
          <li>• "What's my model accuracy?"</li>
          <li>• "How do I fix this error?"</li>
          <li>• "What university should I apply to?"</li>
          <li>• "Generate a research paper"</li>
          <li>• "Explain neural networks"</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceAssistant;
