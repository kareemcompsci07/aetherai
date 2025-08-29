/**
 * AetherAI - Modular Internationalization System
 * File: index.js
 * Purpose: Load and manage multilingual support
 * Created by: Kareem Mostafa | Future City, Cairo, Egypt | 2025
 * Vision: Make AI education accessible in every language.
 */

import en from './en.json';
import ar from './ar.json';
import fr from './fr.json';
import es from './es.json';
import zh from './zh.json';

class I18n {
  constructor() {
    this.resources = { en, ar, fr, es, zh };
    this.language = localStorage.getItem('aetherai_language') || 'en';
    this.observers = [];
    
    // Apply RTL for Arabic
    this.applyDirection();
  }

  getLanguage() {
    return this.language;
  }

  setLanguage(lang) {
    if (this.resources[lang]) {
      this.language = lang;
      localStorage.setItem('aetherai_language', lang);
      this.applyDirection();
      this.notifyObservers(lang);
    }
  }

  applyDirection() {
    document.dir = this.language === 'ar' ? 'rtl' : 'ltr';
  }

  t(key, params = {}) {
    const keys = key.split('.');
    let value = this.resources[this.language];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        // Fallback to English
        value = this.fallbackT(key, params, 'en');
        break;
      }
    }

    if (typeof value === 'string') {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{{${k}}}`, v);
      });
    }

    return value || key;
  }

  fallbackT(key, params, lang) {
    const keys = key.split('.');
    let value = this.resources[lang];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value === 'string') {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{{${k}}}`, v);
      });
    }

    return value;
  }

  subscribe(callback) {
    this.observers.push(callback);
    callback(this.language);
    return () => {
      this.observers = this.observers.filter(cb => cb !== callback);
    };
  }

  notifyObservers(lang) {
    this.observers.forEach(cb => {
      try {
        cb(lang);
      } catch (error) {
        console.error('Error in i18n observer:', error);
      }
    });
  }

  getAvailableLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English' },
      { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
      { code: 'fr', name: 'French', nativeName: 'Français' },
      { code: 'es', name: 'Spanish', nativeName: 'Español' },
      { code: 'zh', name: 'Chinese', nativeName: '中文' }
    ];
  }
}

const i18n = new I18n();
export default i18n;
