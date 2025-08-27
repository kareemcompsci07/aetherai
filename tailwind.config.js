/**
 * AetherAI - Tailwind CSS Configuration
 * Created by: Kareem Mostafa | Cairo, Egypt | 2025
 * Purpose: Customize design system for accessibility and branding
 * Theme: Dark mode, cyan/blue AI aesthetic, mobile-first
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/index.html",
    "./frontend/src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aether: {
          primary: '#00FFFF',    // Cyan for AI & tech
          secondary: '#0099CC',  // Deep blue
          dark: '#0F172A',       // Background
          gray: '#1E293B',       // Cards
          light: '#F1FAFF',      // Text highlight
        },
        status: {
          online: '#00CC66',
          warning: '#FFCC00',
          error: '#FF3333',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'aether': '0 10px 25px rgba(0, 255, 255, 0.15)',
        'aether-lg': '0 20px 40px rgba(0, 255, 255, 0.2)',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
  darkMode: 'class', // For future dark/light mode toggle
}
