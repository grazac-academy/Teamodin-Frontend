/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f0ff',
          100: '#e5dfff',
          200: '#cbbdff',
          300: '#ab94ff',
          400: '#8b67ff',
          500: '#733fff',
          600: '#534ab7', // Brand color
          700: '#5220eb',
          800: '#4319c5',
          900: '#383287', // Dark brand
        }
      }
    },
  },
  plugins: [],
}

