/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f191d',
        accent: '#b08b65',
        beige: '#f3ead6'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.09)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};