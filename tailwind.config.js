/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {backgroundImage: {
      'fondo': "url('/src/assets/img/fondo.webp')",
    },},
  },
  plugins: [],
}

