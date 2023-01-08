/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'two-grid': 'repeat(2, 100px)',
      },
      dropShadow: {
        '4xl': [
          '-4px -4px 8px #ffffff',
          '4px 4px 8px rgba(120, 120, 120, 0.1)',
        ],
        '5xl': [
          '-6px -6px 8px #FFFFFF',
          '6px 6px 8px rgba(216, 224, 233, 0.6)',
        ],
        '6xl': ['0px 4px 40px rgba(90, 176, 224, 0.15)'],
        '7xl': [
          ' -6px -6px 8px rgba(255, 255, 255, 0.6)',
          '6px 6px 8px rgba(117, 117, 117, 0.25)',
        ],
        '8xl': ['0px 4px 20px rgba(0, 0, 0, 0.16)'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
