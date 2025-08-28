/**
 * AetherAI - Debug Assistant Component
 * File: DebugAssistant.jsx
 * Purpose: Help students debug AI/ML errors with AI-powered suggestions
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Every student deserves help when their code doesn't work.
 */

import React, { useState } from 'react';

const DebugAssistant = () => {
  const [errorLog, setErrorLog] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = () => {
    if (!errorLog.trim()) {
      setError('Please enter an error message');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // Mock analysis based on error log
      let result;
      
      const log = errorLog.toLowerCase();
      
      if (log.includes('cuda') && log.includes('memory')) {
        result = {
          error_type: "CUDA Out of Memory",
          solution: "Your GPU ran out of memory. Try reducing the batch size.",
          detailed_solutions: [
            "Reduce batch size (e.g., from 64 to 32)",
            "Use a smaller model architecture",
            "Close other GPU-intensive applications"
          ],
          example_code: "batch_size = 32  # Reduced from 64"
        };
      }
      else if (log.includes('shape') || log.includes('dimension')) {
        result = {
          error_type: "Shape Mismatch",
          solution: "There's a shape mismatch between your data and model layers.",
          detailed_solutions: [
            "Check the input dimensions of your first layer",
            "Ensure your data preprocessing matches the expected input shape",
            "For CNNs, verify input channels (1 for grayscale, 3 for RGB)"
          ],
          example_code: "input_shape = (1, 28, 28)  # MNIST: 1 channel, 28x28"
        };
      }
      else if (log.includes('learning rate') || log.includes('lr')) {
        result = {
          error_type: "Learning Rate Issue",
          solution: "The learning rate wasn't properly set or is too high/low.",
          detailed_solutions: [
            "Set learning_rate=0.001 for Adam optimizer",
            "Try learning_rate=0.01 for SGD",
            "Check if you're passing the learning rate to your optimizer"
          ],
          example_code: "optimizer = torch.optim.Adam(model.parameters(), lr=0.001)"
        };
      }
      else if (log.includes('nan') || log.includes('inf')) {
        result = {
          error_type: "NaN/Infinity Loss",
          solution: "NaN loss usually indicates unstable training. Try reducing the learning rate.",
          detailed_solutions: [
            "Reduce the learning rate (e.g., 0.0001)",
            "Check for data preprocessing issues (division by zero)",
            "Ensure labels are properly formatted"
          ],
          example_code: "learning_rate = 0.0001  # Try a smaller learning rate"
        };
      }
      else {
        result = {
          error_type: "Unknown Error",
          solution: "We couldn't identify this specific error. Here are general debugging tips:",
          detailed_solutions: [
            "Check your code for syntax errors",
            "Verify all variables are properly initialized",
            "Ensure your data is correctly formatted",
            "Review the documentation for the libraries you're using"
          ],
          example_code: "# General debugging\ntry:\n    # Your code here\nexcept Exception as e:\n    print(f'Error: {e}')"
        };
      }
      
      setAnalysis(result);
      setLoading(false);
    }, 1500);
  };

  const handleExampleSelect = (example) => {
    setErrorLog(example.error);
    setAnalysis(null);
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        AI Debugging Assistant 🐞
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Paste your error message below and get AI-powered debugging suggestions.
      </p>

      {/* Error Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Error Log
        </label>
        <textarea
          value={errorLog}
          onChange={(e) => setErrorLog(e.target.value)}
          placeholder="Paste your error message here..."
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none focus:outline-none focus:border-cyan-500 h-32"
        />
        
        {error && (
          <div className="p-3 bg-red-900 bg-opacity-40 border border-red-700 rounded text-red-200 text-sm mt-2">
            {error}
          </div>
        )}
      </div>

      {/* Quick Examples */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-3">Quick Examples:</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { error: "CUDA out of memory", label: "GPU Memory" },
            { error: "Shape mismatch in linear layer", label: "Shape Error" },
            { error: "Learning rate not set", label: "LR Issue" },
            { error: "Loss became NaN", label: "NaN Loss" }
          ].map((ex, i) => (
            <button
              key={i}
              onClick={() => handleExampleSelect(ex)}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs rounded transition"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 disabled:from-gray-600 text-black font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition mb-6"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
            Analyzing Error...
          </div>
        ) : (
          "🔍 Analyze Error"
        )}
      </button>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-5">
          {/* Error Type */}
          <div className="p-4 bg-gradient-to-r from-orange-900 to-red-900 bg-opacity-40 border border-orange-700 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-orange-300 font-semibold">Error Type</span>
              <span className="text-white font-bold">{analysis.error_type}</span>
            </div>
          </div>

          {/* Main Solution */}
          <div className="p-4 bg-blue-900 bg-opacity-40 border border-blue-700 rounded-lg">
            <h4 className="font-semibold text-blue-300 mb-2">Recommended Solution</h4>
            <p className="text-white">{analysis.solution}</p>
          </div>

          {/* Detailed Solutions */}
          <div>
            <h4 className="font-semibold text-green-400 mb-3">🔧 Detailed Solutions</h4>
            <div className="space-y-2">
              {analysis.detailed_solutions.map((solution, i) => (
                <div
                  key={i}
                  className="p-3 bg-green-900 bg-opacity-40 border border-green-800 rounded-lg text-sm text-green-200"
                >
                  {solution}
                </div>
              ))}
            </div>
          </div>

          {/* Example Code */}
          <div>
            <h4 className="font-semibold text-purple-400 mb-3">💡 Example Code</h4>
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
                {analysis.example_code}
              </pre>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes your error message and provides educational debugging suggestions. 
          In the full version, this connects to an AI model on the server.
        </p>
      </div>
    </div>
  );
};

export default DebugAssistant;
