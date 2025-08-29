/**
 * AetherAI - Voice Assistant Component (Updated)
 * File: VoiceAssistant.jsx
 * Purpose: Enable voice interaction with the AI assistant using real API
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AI education accessible through voice for all students.
 */

import React, { useState, useRef, useEffect } from 'react';
import ApiService from '../services/api';

const VoiceAssistant = ({ onSendMessage }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('en'); // 'en' or 'ar'
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

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
    recognition.lang = language === 'ar' ? 'ar-EG' : 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
      setResponse('');
      setError('');
    };

    recognition.onresult = async (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      
      try {
        // Send to AI Mentor API
        const aiResponse = await ApiService.sendMessageToMentor(speechResult);
        const message = aiResponse.response || "I understand you're asking about AI. Could you please provide more details?";
        setResponse(message);
        
        // Speak the response
        speakResponse(message);
        
        // Call parent callback
        if (onSendMessage) {
          onSendMessage(speechResult, message);
        }
      } catch (err) {
        const errorMsg = "I couldn't process your request. Please try again.";
        setResponse(errorMsg);
        speakResponse(errorMsg);
        setError('Failed to get AI response');
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setError(`Speech error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return recognition;
  };

  const toggleListening = () => {
    if (!isSpeechRecognitionAvailable()) {
      setError('Your browser does not support speech recognition. Please use Chrome or Edge.');
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

  const speakResponse = (text) => {
    setIsSpeaking(true);
    
    if (utteranceRef.current) {
      synthRef.current.cancel();
    }
    
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.rate = 0.9;
    utteranceRef.current.pitch = 1;
    utteranceRef.current.volume = 1;
    utteranceRef.current.lang = language === 'ar' ? 'ar-EG' : 'en-US';
    
    utteranceRef.current.onend = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
    };
    
    utteranceRef.current.onerror = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
    };
    
    synthRef.current.speak(utteranceRef.current);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
  };

  const clearConversation = () => {
    setTranscript('');
    setResponse('');
    setError('');
  };

  // Update recognition when language changes
  useEffect(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setTimeout(() => {
        recognitionRef.current = initSpeechRecognition();
        recognitionRef.current.start();
      }, 100);
    }
  }, [language]);

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Voice Assistant 🎤
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Speak to your AI assistant in English or Arabic. Press the microphone to start.
      </p>

      {/* Language Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Language
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => setLanguage('en')}
            className={`flex-1 py-2 font-bold rounded-lg transition ${
              language === 'en'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-black'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={`flex-1 py-2 font-bold rounded-lg transition ${
              language === 'ar'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-black'
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            🇪🇬 العربية
          </button>
        </div>
      </div>

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

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 bg-red-900 bg-opacity-40 border border-red-700 rounded-lg">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={clearConversation}
          disabled={!transcript && !response}
          className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 disabled:from-gray-800 text-black font-bold rounded-lg hover:opacity-90 transition"
        >
          🗑️ Clear
        </button>
      </div>

      {/* Features */}
      <div className="mt-6 p-4 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">How It Works:</h4>
        <ul className="text-gray-300 text-xs space-y-1">
          <li>• Press the microphone to start speaking</li>
          <li>• Your speech is converted to text</li>
          <li>• The AI Mentor processes your question</li>
          <li>• The response is spoken back to you</li>
          <li>• Supports both English and Arabic</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceAssistant;
