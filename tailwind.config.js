/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./page*.html", "./script.js"],
  theme: {
    extend: {
      colors: {
        // Premium palette: deep blue/ink for main, soft teal for secondary
        'ink': {
          DEFAULT: '#1e3a5f',
          dark: '#152a45',
          light: '#2d4d78',
        },
        'teal': {
          DEFAULT: '#5a8a8f',
          dark: '#4a7377',
          light: '#7aa5aa',
          pale: '#e8f2f3',
        },
        'slate': {
          50: '#f8f9fb',
          100: '#f1f3f6',
          200: '#e4e8ed',
          300: '#cbd2dc',
          400: '#9ba5b5',
          500: '#6b7684',
          600: '#4a5568',
          700: '#364152',
          800: '#2d3748',
          900: '#1a202c',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        'tighter': '-0.03em',
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.01em',
        'wider': '0.02em',
        'widest': '0.05em',
      },
    },
  },
  plugins: [],
}
