/**
 * AetherAI - Internationalization (i18n) System
 * File: i18n/index.js
 * Purpose: Centralized translation management for Arabic and English
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AetherAI accessible to Arabic-speaking students.
 */

import ar from './ar.json';
import en from './en.json'; // We'll create this next

// Default language
const DEFAULT_LANGUAGE = 'en';

// Get user's preferred language
const getPreferredLanguage = () => {
  const savedLang = localStorage.getItem('aetherai-language');
  if (savedLang && ['en', 'ar'].includes(savedLang)) {
    return savedLang;
  }
  
  // Detect browser language
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'ar') {
    return 'ar';
  }
  
  return DEFAULT_LANGUAGE;
};

// Current language
let currentLang = getPreferredLanguage();

// Set of listeners to notify when language changes
const listeners = new Set();

// Update listeners
const notifyListeners = () => {
  listeners.forEach(listener => listener(currentLang));
};

// Change language
const setLanguage = (lang) => {
  if (['en', 'ar'].includes(lang)) {
    currentLang = lang;
    localStorage.setItem('aetherai-language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    notifyListeners();
  }
};

// Subscribe to language changes
const subscribe = (listener) => {
  listeners.add(listener);
  // Call immediately with current language
  listener(currentLang);
  return () => listeners.delete(listener);
};

// Translate function
const t = (key, lang = currentLang) => {
  const translations = lang === 'ar' ? ar : en;
  return key.split('.').reduce((obj, k) => obj?.[k] || k, translations) || key;
};

// Get current language
const getLanguage = () => currentLang;

// Export functions
export default {
  t,
  setLanguage,
  getLanguage,
  subscribe
};

// Add to window for debugging (optional)
if (typeof window !== 'undefined') {
  window.i18n = { t, setLanguage, getLanguage };
}
