/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#d4a853',
        'accent-hover': '#e8c16a',
        canvas: '#0f1419',
        'canvas-light': 'rgba(26, 35, 50, 0.8)',
        'canvas-lighter': 'rgba(36, 48, 66, 0.9)',
        text: '#e5e7eb',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(212, 168, 83, 0.25)',
        card: '0 4px 24px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 168, 83, 0.1)',
      },
    },
  },
  plugins: [],
};
