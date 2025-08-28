/**
 * AetherAI - AI Mentor Chat Component
 * File: AIMentor.jsx
 * Purpose: Provide educational AI support to students
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Every student deserves a personal AI tutor.
 */

import React, { useState } from 'react';

const AIMentor = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm AetherAI Mentor 🤖\nI'm here to help you with your AI experiments.\nAsk me anything about models, datasets, or training!",
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Simple rule-based responses (in full version: connects to Hugging Face API)
  const getResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('accuracy') || msg.includes('not increasing')) {
      return "📉 If accuracy isn't increasing:\n\n1. Try increasing the learning rate slightly\n2. Check if your dataset is balanced\n3. Add more layers to your model\n4. Train for more epochs\n\nRemember: Some models take time to 'break through' the initial plateau!";
    }
    
    if (msg.includes('loss') || msg.includes('high loss')) {
      return "📉 High loss means the model isn't learning well. Try:\n\n• Reduce learning rate\n• Use a different optimizer (Adam is usually safe)\n• Check data preprocessing\n• Ensure labels are correct";
    }
    
    if (msg.includes('cnn') || msg.includes('mlp') || msg.includes('which model')) {
      return "🧠 Model selection guide:\n\n• CNN: Best for images (MNIST, CIFAR-10)\n• MLP: Good for tabular or flattened data\n• LSTM: For text or sequences\n• Transformer: For advanced NLP tasks\n\nStart with CNN for images, MLP for numbers!";
    }
    
    if (msg.includes('learning rate') || msg.includes('lr')) {
      return "⚡ Learning rate tips:\n\n• Too high: Loss jumps around or diverges\n• Too low: Training is very slow\n• Start with 0.001 for Adam\n• For SGD, try 0.01\n\nAdjust in powers of 10 (0.1 → 0.01 → 0.001)";
    }
    
    if (msg.includes('overfitting') || msg.includes('over fitting')) {
      return "⚠️ Signs of overfitting:\n\n• Training accuracy ↑ but validation accuracy ↓\n• Solved by:\n  - Add dropout layers\n  - Use data augmentation\n  - Reduce model complexity\n  - Early stopping";
    }
    
    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're welcome! Keep experimenting 🚀\nRemember: Every great AI researcher started where you are now.";
    }
    
    if (msg.includes('help') || msg.includes('stuck')) {
      return "Don't worry! Here's how to proceed:\n\n1. Check your dataset structure\n2. Start with a simple model (MLP or CNN)\n3. Use default hyperparameters\n4. Train for 10 epochs\n5. Analyze results\n\nSmall steps lead to big discoveries!";
    }
    
    return "I understand you're asking about AI training!\n\nWhile I can't run complex models here, here are general tips:\n\n• Start simple, then increase complexity\n• Use validation data to check performance\n• Don't be afraid to experiment!\n\nFor specific advice, try asking about accuracy, loss, or model selection.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getResponse(input),
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl flex flex-col h-96">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        AI Mentor Chat 🤖
      </h3>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-black'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 bg-gray-700 rounded-2xl text-white">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex space-x-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask AetherAI Mentor anything about AI training..."
          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white resize-none focus:outline-none focus:border-cyan-500"
          rows="1"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="px-6 py-2 bg-cyan-600 disabled:bg-gray-600 text-black font-bold rounded-lg hover:bg-cyan-500 transition"
        >
          Send
        </button>
      </div>

      {/* Info */}
      <p className="text-xs text-gray-500 text-center mt-2">
        Powered by educational rules • No GPU needed • For student learning
      </p>
    </div>
  );
};

export default AIMentor;
