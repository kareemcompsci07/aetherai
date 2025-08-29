/**
 * AetherAI - PWA Notification Component
 * File: PWANotification.jsx
 * Purpose: Show PWA installation prompts and offline status
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AI education accessible even without internet.
 */

import React, { useState, useEffect } from 'react';

const PWANotification = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showInstall, setShowInstall] = useState(false);
  const [installStatus, setInstallStatus] = useState('');

  // Handle online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle PWA install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      
      // Update UI to notify the user they can install the PWA
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstall(false);
      setInstallStatus('installed');
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setInstallStatus('installed');
      setShowInstall(false);
    } else {
      setInstallStatus('dismissed');
    }
    
    // Clear the deferred prompt
    setDeferredPrompt(null);
  };

  const handleRefreshClick = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
      });
    }
    window.location.reload();
  };

  // Show notification only if not installed and online
  if (!showInstall && !isOffline && installStatus !== 'updating') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50">
      <div className="bg-gray-800 bg-opacity-95 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 shadow-2xl animate-fade-in">
        {/* Offline Status */}
        {isOffline && (
          <div className="mb-4 p-3 bg-gradient-to-r from-red-900 to-pink-900 bg-opacity-40 border border-red-700 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <span className="text-red-200 font-medium">Offline Mode</span>
            </div>
            <p className="text-red-300 text-sm mt-1">
              You're offline. Your work is saved locally and will sync when connection returns.
            </p>
          </div>
        )}

        {/* Install Prompt */}
        {showInstall && (
          <div className="mb-4 p-3 bg-gradient-to-r from-cyan-900 to-blue-900 bg-opacity-40 border border-cyan-700 rounded-lg">
            <div className="flex items-start space-x-3">
              <img src="/assets/logo.png" alt="AetherAI" className="w-10 h-10 rounded-lg" />
              <div className="flex-1">
                <h4 className="text-white font-bold">Install AetherAI</h4>
                <p className="text-cyan-200 text-sm mt-1">
                  Add AetherAI to your home screen for quick access.
                </p>
              </div>
            </div>
            <div className="flex space-x-2 mt-3">
              <button
                onClick={handleInstallClick}
                className="flex-1 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-bold rounded-lg hover:opacity-90 transition text-sm"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstall(false)}
                className="px-3 py-2 bg-gray-700 text-gray-300 font-bold rounded-lg hover:bg-gray-600 transition text-sm"
              >
                Not Now
              </button>
            </div>
          </div>
        )}

        {/* Install Status */}
        {installStatus === 'installed' && (
          <div className="p-3 bg-gradient-to-r from-green-900 to-emerald-900 bg-opacity-40 border border-green-700 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-200 font-medium">App Installed!</span>
            </div>
            <p className="text-green-300 text-sm mt-1">
              AetherAI is now available on your home screen.
            </p>
          </div>
        )}

        {/* Service Worker Update */}
        {installStatus === 'updating' && (
          <div className="p-3 bg-gradient-to-r from-yellow-900 to-orange-900 bg-opacity-40 border border-yellow-700 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-yellow-200 font-medium">Update Available</span>
            </div>
            <p className="text-yellow-300 text-sm mt-1">
              A new version is ready. Click below to update.
            </p>
            <button
              onClick={handleRefreshClick}
              className="mt-2 w-full py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-lg hover:opacity-90 transition text-xs"
            >
              Update Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PWANotification;
