/**
 * AetherAI - Language Switcher Component
 * File: LanguageSwitcher.jsx
 * Purpose: Allow users to switch between Arabic and English
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AetherAI accessible to Arabic-speaking students.
 */

import React, { useState, useEffect } from 'react';

const LanguageSwitcher = ({ onLanguageChange }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Check saved preference
    const savedLang = localStorage.getItem('aetherai-language');
    if (savedLang && ['en', 'ar'].includes(savedLang)) {
      setLanguage(savedLang);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'ar') {
        setLanguage('ar');
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('aetherai-language', newLang);
    onLanguageChange?.(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition"
      dir="ltr"
    >
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
