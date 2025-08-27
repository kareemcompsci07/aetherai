/**
 * AetherAI - Dataset Analysis Component
 * File: DatasetAnalysis.jsx
 * Purpose: Display automatic insights about uploaded datasets
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Help students understand their data before training.
 */

import React, { useState } from 'react';

const DatasetAnalysis = ({ analysis }) => {
  const [expanded, setExpanded] = useState(false);

  if (!analysis) {
    return (
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl text-center">
        <p className="text-gray-400 text-sm">No dataset analysis available yet</p>
      </div>
    );
  }

  const { summary, structure, images, text, issues, suggestions } = analysis;

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Dataset Analysis 📊
      </h3>

      <p className="text-gray-300 mb-6 text-sm">
        Automatic insights about your dataset to help you choose the right model and configuration.
      </p>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Files', value: summary?.files || 0, icon: '📁' },
          { label: 'Size', value: `${summary?.size_mb} MB`, icon: '📊' },
          { label: 'Dirs', value: summary?.directories || 0, icon: '🗂️' },
          { label: 'Images', value: images?.image_files || 0, icon: '🖼️' }
        ].map((item, i) => (
          <div key={i} className="p-4 bg-black bg-opacity-40 rounded-lg text-center">
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-gray-300 text-xs">{item.label}</div>
            <div className="text-white font-bold">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Structure */}
      <div className="mb-6">
        <h4 className="font-semibold text-white mb-3">📁 Structure</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Root Folders:</span>
            <span className="text-cyan-400">{structure?.root_directories?.join(', ') || 'None'}</span>
          </div>
          <div className="flex justify-between">
            <span>Has Train Split:</span>
            <span className={structure?.has_train_split ? 'text-green-400' : 'text-red-400'}>
              {structure?.has_train_split ? '✅ Yes' : '❌ No'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Has Validation:</span>
            <span className={structure?.has_validation_split ? 'text-green-400' : 'text-red-400'}>
              {structure?.has_validation_split ? '✅ Yes' : '❌ No'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Has Test Split:</span>
            <span className={structure?.has_test_split ? 'text-green-400' : 'text-red-400'}>
              {structure?.has_test_split ? '✅ Yes' : '❌ No'}
            </span>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mb-6">
        <h4 className="font-semibold text-white mb-3">💡 Suggestions</h4>
        <div className="space-y-2">
          {suggestions && suggestions.length > 0 ? (
            suggestions.map((suggestion, i) => (
              <div
                key={i}
                className="p-3 bg-gradient-to-r from-blue-900 to-cyan-900 bg-opacity-40 border border-cyan-800 rounded-lg text-sm"
              >
                {suggestion}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No suggestions available</p>
          )}
        </div>
      </div>

      {/* Issues */}
      {issues && issues.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-white mb-3">⚠️ Issues Detected</h4>
          <div className="space-y-2">
            {issues.map((issue, i) => (
              <div
                key={i}
                className="p-3 bg-gradient-to-r from-red-900 to-orange-900 bg-opacity-40 border border-red-800 rounded-lg text-sm text-red-200"
              >
                {issue}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expandable Raw Data */}
      <div className="mt-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-cyan-400 hover:underline"
        >
          {expanded ? 'Hide raw analysis' : 'Show raw analysis'}
        </button>
        {expanded && (
          <pre className="mt-2 p-3 bg-gray-900 rounded-lg text-xs text-gray-300 overflow-auto max-h-40">
            {JSON.stringify(analysis, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default DatasetAnalysis;
