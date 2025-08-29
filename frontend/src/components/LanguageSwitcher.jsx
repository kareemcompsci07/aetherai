/**
 * AetherAI - Language Switcher Component
 * File: LanguageSwitcher.jsx
 * Purpose: Allow users to switch between supported languages
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AI education accessible in every language.
 */

import React, { useState } from 'react';
import i18n from '../i18n';

const LanguageSwitcher = ({ onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = i18n.getAvailableLanguages();

  const handleLanguageSelect = (langCode) => {
    i18n.setLanguage(langCode);
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  // Get current language display
  const currentLang = languages.find(lang => lang.code === i18n.getLanguage()) || languages[0];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center w-full px-3 py-1 text-sm font-medium text-gray-300 bg-gray-700 bg-opacity-50 rounded-md hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          id="language-menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="flex items-center">
            {currentLang.code === 'en' && '🇬🇧'}
            {currentLang.code === 'ar' && '🇪🇬'}
            {currentLang.code === 'fr' && '🇫🇷'}
            {currentLang.code === 'es' && '🇪🇸'}
            {currentLang.code === 'zh' && '🇨🇳'}
            <span className="ml-1.5">{currentLang.nativeName}</span>
          </span>
          <svg
            className={`ml-1.5 h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  i18n.getLanguage() === lang.code
                    ? 'bg-cyan-400 text-black font-bold'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                role="menuitem"
              >
                <div className="flex items-center">
                  <span className="mr-2">
                    {lang.code === 'en' && '🇬🇧'}
                    {lang.code === 'ar' && '🇪🇬'}
                    {lang.code === 'fr' && '🇫🇷'}
                    {lang.code === 'es' && '🇪🇸'}
                    {lang.code === 'zh' && '🇨🇳'}
                  </span>
                  <span>{lang.nativeName}</span>
                  <span className="ml-2 text-gray-500">({lang.name})</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
