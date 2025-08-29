/**
 * AetherAI - Code Auto-Completion Component
 * File: CodeAutoComplete.jsx
 * Purpose: Provide AI-powered code suggestions for AI model building
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students write better AI code with intelligent suggestions.
 */

import React, { useState, useEffect } from 'react';

const CodeAutoComplete = ({ codeContext }) => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('suggestions');

  // Simulate API call
  useEffect(() => {
    const generateSuggestions = () => {
      // Mock data based on code context
      const mockSuggestions = {
        code_context: codeContext || "import torch\nimport torch.nn as nn\nclass MNISTClassifier(nn.Module):",
        suggestions: [
          {
            type: "model_structure",
            title: "Complete CNN Architecture",
            description: "Full convolutional neural network for image classification",
            code: `class MNISTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 7 * 7, 512)
        self.fc2 = nn.Linear(512, 10)
        self.dropout = nn.Dropout(0.5)
    
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 7 * 7)
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x`,
            confidence: 0.95
          },
          {
            type: "training_loop",
            title: "Training Loop with Monitoring",
            description: "Complete training loop with loss and accuracy tracking",
            code: `def train_model(model, train_loader, criterion, optimizer, num_epochs=10):
    model.train()
    for epoch in range(num_epochs):
        running_loss = 0.0
        correct = 0
        total = 0
        
        for inputs, labels in train_loader:
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item()
            _, predicted = outputs.max(1)
            total += labels.size(0)
            correct += predicted.eq(labels).sum().item()
        
        print(f'Epoch {epoch+1}, Loss: {running_loss/len(train_loader):.3f}, Accuracy: {100.*correct/total:.2f}%')`,
            confidence: 0.90
          },
          {
            type: "hyperparameters",
            title: "Recommended Hyperparameters",
            description: "Optimal settings for MNIST classification",
            code: `# Hyperparameters
learning_rate = 0.001
batch_size = 64
num_epochs = 10
optimizer = "Adam"
criterion = "CrossEntropyLoss"
model_architecture = "CNN"
input_size = 784
output_size = 10`,
            confidence: 0.85
          }
        ],
        total_suggestions: 3,
        timestamp: new Date().toISOString()
      };

      setTimeout(() => {
        setSuggestions(mockSuggestions);
        setLoading(false);
      }, 1500);
    };

    generateSuggestions();
  }, [codeContext]);

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-green-400';
    if (confidence >= 0.8) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 0.9) return '🟢';
    if (confidence >= 0.8) return '🟡';
    return '🔴';
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Code Assistant 💻
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Get AI-powered code suggestions and completions. Write better AI code with intelligent assistance.
      </p>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="space-y-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="text-gray-400">Analyzing your code...</p>
          </div>
        </div>
      ) : null}

      {!loading && suggestions && (
        <>
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            <button
              onClick={() => setActiveTab('suggestions')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'suggestions'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Suggestions ({suggestions.total_suggestions})
            </button>
            <button
              onClick={() => setActiveTab('error')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'error'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Error Help
            </button>
            <button
              onClick={() => setActiveTab('best-practices')}
              className={`px-4 py-2 font-medium rounded-lg transition ${
                activeTab === 'best-practices'
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Best Practices
            </button>
          </div>

          {/* Suggestions Tab */}
          {activeTab === 'suggestions' && (
            <div className="space-y-4">
              {suggestions.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-indigo-900 to-purple-900 bg-opacity-40 border border-indigo-700 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-indigo-200">{suggestion.title}</h4>
                    <div className="flex items-center space-x-1">
                      <span className={getConfidenceColor(suggestion.confidence)}>
                        {getConfidenceIcon(suggestion.confidence)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {Math.round(suggestion.confidence * 100)}% confidence
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-300 mb-3">
                    {suggestion.description}
                  </div>
                  
                  <div className="bg-black bg-opacity-40 rounded-lg p-3 border border-gray-600">
                    <pre className="text-xs text-green-300 whitespace-pre-wrap">
                      {suggestion.code}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error Help Tab */}
          {activeTab === 'error' && (
            <div className="space-y-6">
              <div className="p-4 bg-red-900 bg-opacity-40 border border-red-700 rounded-lg">
                <h4 className="font-semibold text-red-200 mb-2">RuntimeError: shape '[*]' is invalid for input of size [*]</h4>
                <div className="text-sm text-gray-300 mb-3">
                  <strong>Explanation:</strong> The tensor dimensions don't match for the operation
                </div>
                <div>
                  <strong className="text-yellow-300">Solutions:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-300 mt-2 space-y-1">
                    <li>Check the output shape of your previous layer</li>
                    <li>Use .view() or .reshape() to adjust tensor dimensions</li>
                    <li>Verify your input size matches the first layer</li>
                    <li>Print tensor shapes during forward pass for debugging</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-black bg-opacity-40 rounded-lg border border-gray-600">
                <h5 className="font-medium text-cyan-300 mb-2">Code Example:</h5>
                <pre className="text-xs text-green-300 whitespace-pre-wrap">
{`# Debug tensor shapes
print(f"Input shape: {x.shape}")
x = self.conv1(x)
print(f"After conv1: {x.shape}")
x = self.pool(x)
print(f"After pool: {x.shape}")`}
                </pre>
              </div>
            </div>
          )}

          {/* Best Practices Tab */}
          {activeTab === 'best-practices' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-900 bg-opacity-40 border border-blue-700 rounded-lg">
                  <h4 className="font-semibold text-blue-200 mb-3">Model Design</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Use modular design with separate layers</li>
                    <li>• Include dropout for regularization</li>
                    <li>• Use batch normalization for faster training</li>
                    <li>• Initialize weights properly</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-900 bg-opacity-40 border border-green-700 rounded-lg">
                  <h4 className="font-semibold text-green-200 mb-3">Training</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Use learning rate scheduling</li>
                    <li>• Implement early stopping</li>
                    <li>• Monitor training and validation loss</li>
                    <li>• Use gradient clipping for RNNs</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-900 bg-opacity-40 border border-yellow-700 rounded-lg">
                  <h4 className="font-semibold text-yellow-200 mb-3">Debugging</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Print tensor shapes during forward pass</li>
                    <li>• Use small batch sizes for debugging</li>
                    <li>• Test on a small subset of data first</li>
                    <li>• Visualize model architecture</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-900 bg-opacity-40 border border-purple-700 rounded-lg">
                  <h4 className="font-semibold text-purple-200 mb-3">Performance</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Use GPU acceleration when available</li>
                    <li>• Optimize data loading with proper batch sizes</li>
                    <li>• Consider model quantization for deployment</li>
                    <li>• Profile code to identify bottlenecks</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">🤖 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          AetherAI analyzes your code context to provide intelligent suggestions. 
          In the full version, this connects to a machine learning model that predicts the next code block.
        </p>
      </div>
    </div>
  );
};

export default CodeAutoComplete;
