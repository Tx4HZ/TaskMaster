/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mocha: {
          base: '#1E1E2E',
          surface0: '#313244',
          surface1: '#45475A',
          text: '#CDD6F4',
          subtext0: '#A6ADC8',
          rosewater: '#f5e0dc',
          blue: '#89B4FA',
          red: '#F38BA8',
          green: '#A6E3A1',
          sapphire: '#74c7ec',
          teal: '#94e2d5',
          overlay0: '#6C7086',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}