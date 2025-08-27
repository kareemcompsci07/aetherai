/**
 * AetherAI - Dataset Uploader Component
 * File: DatasetUploader.jsx
 * Purpose: Allow students to upload custom datasets or select preloaded ones
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: No GPU? No problem. Just upload and train.
 */

import React, { useState } from 'react';

const DatasetUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = ['application/zip', 'application/x-zip-compressed'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setUploadStatus('❌ Please upload a .zip file');
        return;
      }
      if (selectedFile.size > 100 * 1024 * 1024) { // 100MB limit
        setUploadStatus('❌ Dataset too large (max 100MB)');
        return;
      }
      setFile(selectedFile);
      setUploadStatus(`📄 Selected: ${selectedFile.name}`);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setUploadStatus('⚠️ Please select a file first');
      return;
    }
    setUploadStatus('🚀 Uploading... (Simulated)');
    // Simulate upload delay
    setTimeout(() => {
      setUploadStatus(`✅ Uploaded: ${file.name}`);
    }, 2000);
  };

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset);
    setUploadStatus(`✅ Loaded preset dataset: ${preset}`);
    setFile(null); // Clear custom file
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-cyan-400 flex items-center">
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
        Dataset Selection
      </h3>

      {/* Preset Datasets */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 text-white">Choose a Preloaded Dataset</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['MNIST', 'CIFAR-10', 'Fashion-MNIST', 'IMDB', 'SST-2', 'Iris'].map((dataset) => (
            <button
              key={dataset}
              onClick={() => handlePresetSelect(dataset)}
              className={`py-3 px-4 rounded-lg text-sm font-medium transition
                ${selectedPreset === dataset
                  ? 'bg-cyan-500 text-black'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
            >
              {dataset}
            </button>
          ))}
        </div>
      </div>

      {/* OR Divider */}
      <div className="flex items-center mb-6">
        <div className="flex-1 border-t border-gray-600"></div>
        <span className="px-4 text-gray-400 text-sm">OR</span>
        <div className="flex-1 border-t border-gray-600"></div>
      </div>

      {/* Custom Upload */}
      <div>
        <h4 className="text-lg font-semibold mb-4 text-white">Upload Your Own Dataset (.zip)</h4>
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-cyan-500 transition">
          <input
            type="file"
            accept=".zip"
            onChange={handleFileChange}
            className="hidden"
            id="dataset-upload"
          />
          <label
            htmlFor="dataset-upload"
            className="cursor-pointer block"
          >
            <div className="text-cyan-400 text-5xl mb-2">📁</div>
            <p className="text-gray-300 mb-1">
              {file ? file.name : 'Click to upload a .zip dataset'}
            </p>
            <p className="text-xs text-gray-500">
              Max 100MB – for students with limited bandwidth
            </p>
          </label>
        </div>

        {/* Upload Button */}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleUpload}
            disabled={!file}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 disabled:from-gray-700 disabled:to-gray-700 text-black font-bold py-3 px-6 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition disabled:hover:from-gray-700 disabled:hover:to-gray-700"
          >
            Upload Dataset
          </button>
          {file && (
            <button
              onClick={() => { setFile(null); setUploadStatus(''); }}
              className="px-4 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Status */}
      {uploadStatus && (
        <div className="mt-6 p-3 bg-black bg-opacity-40 rounded-lg text-sm font-mono border border-gray-700">
          {uploadStatus}
        </div>
      )}
    </div>
  );
};

export default DatasetUploader;
