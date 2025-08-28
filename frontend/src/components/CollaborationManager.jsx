/**
 * AetherAI - Collaboration Manager Component
 * File: CollaborationManager.jsx
 * Purpose: Allow students to share experiments with classmates
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students learn AI together, not alone.
 */

import React, { useState } from 'react';

const CollaborationManager = ({ experimentId }) => {
  const [creatorName, setCreatorName] = useState('Anonymous');
  const [expiresIn, setExpiresIn] = useState(24);
  const [shareLink, setShareLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateLink = () => {
    if (!experimentId) {
      setError('No experiment to share');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // In full version: call API
      const mockLinkId = 'abc123xyz';
      const link = `http://aetherai.app/share/${mockLinkId}`;
      
      setShareLink(link);
      setLoading(false);
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('✅ Link copied to clipboard!');
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Student Collaboration 🤝
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Share your AI experiment with classmates and learn together.
      </p>

      {!shareLink ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Name (optional)
            </label>
            <input
              type="text"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              placeholder="e.g. Kareem"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Link Valid For: {expiresIn} hours
            </label>
            <input
              type="range"
              min="1"
              max="72"
              value={expiresIn}
              onChange={(e) => setExpiresIn(e.target.value)}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              1 hour to 3 days
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-900 bg-opacity-40 border border-red-700 rounded text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleCreateLink}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 disabled:from-gray-600 text-black font-bold rounded-lg hover:from-green-500 hover:to-blue-500 transition"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                Creating Link...
              </div>
            ) : (
              "🔗 Create Share Link"
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-black bg-opacity-40 rounded-lg border border-cyan-900">
            <div className="text-sm text-gray-400">Your Share Link</div>
            <div className="text-cyan-400 font-mono break-all mt-1">{shareLink}</div>
          </div>

          <div className="text-sm text-gray-400">
            🔐 This link will expire in {expiresIn} hours or after 10 views.
          </div>

          <button
            onClick={handleCopyLink}
            className="w-full py-2 bg-cyan-600 text-black font-bold rounded-lg hover:bg-cyan-500 transition"
          >
            Copy Link
          </button>

          <button
            onClick={() => setShareLink('')}
            className="w-full py-2 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition mt-2"
          >
            Create New Link
          </button>
        </div>
      )}

      <div className="mt-6 p-3 bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-purple-300 mb-2">💡 How It Works:</h4>
        <p className="text-gray-300 text-xs">
          Share your experiment with classmates. They can view your results, 
          training metrics, and insights — no login required.
        </p>
      </div>
    </div>
  );
};

export default CollaborationManager;
