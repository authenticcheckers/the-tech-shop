/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Scans all files in the app directory
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Scans all files in the pages directory (optional but safe)
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Scans all files in the components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
