/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0f172a',
        slate: '#1e293b',
        accent: '#38bdf8',
        accent2: '#818cf8',
        success: '#34d399',
        muted: '#94a3b8',
      },
    },
  },
  plugins: [],
};